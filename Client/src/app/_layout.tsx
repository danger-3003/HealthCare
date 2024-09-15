import { Stack } from "expo-router";
import { LoginProvider } from "./Context/Login/LoginContext";

export default function rootLayout() {
    return (
        <LoginProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown:false}}/>
                <Stack.Screen
                    name="Interfaces/Authentication/Signin/index"
                    options={{ headerTitle: "Sign In" }}
                />
                <Stack.Screen
                    name="Interfaces/Authentication/Signup/index"
                    options={{ headerTitle: "Sign Up" }}
                />
                <Stack.Screen
                    name="Interfaces/(tabs)"
                    options={{ headerShown:false }}
                />
            </Stack>
        </LoginProvider>
    );
}