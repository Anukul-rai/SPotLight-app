import * as SecureStore from 'expo-secure-store'
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import {ConvexProviderWithClerk} from 'convex/react-clerk'
import {ConvexReactClient} from 'convex/react'



const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("Missing Convex URL. Please set EXPO_PUBLIC_CONVEX_URL.");
}
const convex = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false
});
// Get the publishable key
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing publishable Key. Please set EXPO");
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function ClerkAndConvexProvider({children}:{children: React.ReactNode}) {
  return (
   <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <ClerkLoaded>{children}</ClerkLoaded>
    </ConvexProviderWithClerk>
   </ClerkProvider>
  )
}