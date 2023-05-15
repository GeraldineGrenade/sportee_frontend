import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook"
import * as AuthSession from "expo-auth-session"

WebBrowser.maybeCompleteAuthSession()


export default function App() {
    const [token, setToken] = useState("")
    const [userInfo, setUserInfo] = useState(null)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "1016759034555-pt2a62f4a0q7msu6f9p7rt9aetlin4a4.apps.googleusercontent.com",
        scopes: ["openid", "profile", "email"],
    })

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken)
            getUserInfo()
        }
    }, [response, token])

    const getUserInfo = async () => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json()
            setUserInfo(user)
        } catch (error) {
            console.log('error')
        }
    }

    return (
        <View style={styles.container}>
            {userInfo === null ? (
                <View style={styles.googleBtn}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px"><Path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><Path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><Path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><Path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></Svg>
                    <Button
                        title="Sign in with Google"
                        disabled={!request}
                        style={styles.googleText}
                        onPress={() => {
                            promptAsync()
                        }}
                    />
                </View>
            ) : (
                <Text style={styles.text}>{userInfo.name}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'ffffff'
    },
    googleBtn: {
        height: 50,
        width: 250,
        backgroundColor: '#121C6E',
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row'

    },
})