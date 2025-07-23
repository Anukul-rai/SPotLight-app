import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { router } from 'expo-router'

export default function Login() {
    const [loading,setLoading]=useState<boolean>(false)
    const {startSSOFlow}=useSSO()

    const handleGoogleSignIn=async()=>{
        setLoading(true)
        try {
            const{createdSessionId,setActive}=await startSSOFlow({strategy:"oauth_google"})  // all from clerk 
            if(setActive && createdSessionId){
                setActive({session:createdSessionId}) //authenticate the current user
                router.replace('/(tabs)')
            }
        } catch (error) {
            console.log("Oauth-error",error)
            Alert.alert("Login Error", "Something went wrong. Please try again.");
        }finally{
            setLoading(false)
        }
    }
    return (
    <View style={styles.container}>
        {/* Brand Section */}
        <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
                <Ionicons name='leaf' size={32} color={COLORS.primary}/>
            </View>
            <Text style={styles.appName}>spotlight</Text>
            <Text style={styles.tagline}>Don't miss anything</Text>
        </View>
        <View style={styles.illustrationContainer}>
            <Image 
            source={require('../../assets/images/Social media-cuate.png')} 
            style={styles.illustration}
            resizeMode='contain'/>
        </View>

         {/* Login Section */}
            <View style={styles.loginSection}>
                <TouchableOpacity
                    style={[styles.googleButton, loading && { opacity: 0.7 }]}
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.8}
                    accessibilityLabel="Sign in with Google"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.surface} />
                    ) : (
                        <>
                            <View style={styles.googleIconContainer}>
                                <Ionicons name='logo-google' size={20} color={COLORS.surface} />
                            </View>
                            <Text style={styles.googleButtonText}>Continue with Google</Text>
                        </>
                    )}
                </TouchableOpacity>
                
                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms and Privacy Policy
                </Text>
            </View>
    </View>
  )
}