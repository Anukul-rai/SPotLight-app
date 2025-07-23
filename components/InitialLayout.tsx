import { useAuth } from "@clerk/clerk-expo"
import { router, Stack, useSegments } from "expo-router"
import { useEffect } from "react"


export default function InitialLayout() {
    const {isLoaded,isSignedIn} = useAuth()
    const segments = useSegments()
    
    useEffect(()=>{
        if (!isLoaded)return;

        const isAuthScrenn = segments[0]==='(auth)'

        if (!isSignedIn && !isAuthScrenn) router.replace('/(auth)/login')
        else if(isSignedIn && isAuthScrenn) router.replace('/(tabs)')
    },[isLoaded,isSignedIn,segments])

    if(!isLoaded) return null
    return(
        <Stack screenOptions={{
            headerShown:false
        }}/>
    )

}