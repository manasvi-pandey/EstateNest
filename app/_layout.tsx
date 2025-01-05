import { SplashScreen, Stack } from "expo-router";
import "./global.css";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "@/providers/global-provider";

import * as Network from "expo-network";
import { Alert } from "react-native";

import { StatusBar } from "expo-status-bar";

const checkInternetConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();

    if (!networkState.isConnected) {
        Alert.alert(
            "No internet",
            "Seems like you are not connected to the Internet. Please check your connection and try again."
        );
    }
};

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    });

    useEffect(() => {
        checkInternetConnection();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <GlobalProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }} />
        </GlobalProvider>
    );
}
