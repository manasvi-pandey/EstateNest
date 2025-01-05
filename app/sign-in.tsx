import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/providers/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if (!loading && isLoggedIn) return <Redirect href="/" />;

    const handleLogin = async () => {
        const result = await login();

        if (result) {
            refetch();
        } else {
            Alert.alert("Error", "An error occurred while logging in");
        }
    };

    return (
        <View className="flex-1 bg-white">
            <View className="w-full h-3/5">
                <Image
                    source={images.onboarding}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
                <Image source={images.whiteGradient} className="absolute" />
            </View>
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerClassName="h-full">
                    <View className="px-10 h-full justify-around">
                        <View className="gap-2">
                            <Text className="text-4xl font-roboto-black text-center">
                                Book your{" "}
                                <Text className="text-primary-300">dream</Text>{" "}
                                home{" "}
                                <Text className="text-primary-300">
                                    effortlessly
                                </Text>
                            </Text>
                            <Text className="text-center text-lg font-roboto">
                                Rentals and Stays simplified
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={handleLogin}
                            className="bg-primary-300 shadow-sm rounded-full w-full py-3 mt-5"
                        >
                            <View className="flex-row items-center justify-center gap-4">
                                <Text className="text-lg font-rubik text-white">
                                    Let's get started
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default SignIn;
