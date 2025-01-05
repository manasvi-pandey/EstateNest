import {
    Text,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import ProfileItem from "@/components/ProfileItem";
import { useGlobalContext } from "@/providers/global-provider";
import { logout } from "@/lib/appwrite";

const Profile = () => {
    const { user, refetch } = useGlobalContext();

    const handleLogout = async () => {
        const result = await logout();

        if (result) {
            Alert.alert("Success", "You have been logged out successfully");
            refetch();
        } else {
            Alert.alert("Error", "An error occurred while logging out");
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="px-4 py-6 mt-1"
            >
                <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-roboto-medium">Profile</Text>
                    <Image source={icons.bell} className="size-6" />
                </View>

                <View className="mt-6 items-center justify-center gap-2">
                    <Image
                        source={{ uri: user?.avatar }}
                        className="size-40 rounded-full"
                    />
                </View>

                <View className="mt-4 items-center gap-2">
                    <Text className="text-center font-roboto-medium text-2xl">
                        {user?.name}
                    </Text>
                    <TouchableOpacity onPress={() => alert("Edit profile")}>
                        <Text className="text-primary-300 font-roboto-bold">
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-12 gap-6">
                    {settings.map((setting, index) => (
                        <ProfileItem
                            key={index}
                            {...setting}
                            onPress={() =>
                                alert(`${setting.title} got pressed`)
                            }
                        />
                    ))}
                </View>

                <View className="mt-8 pt-4 border-t border-gray-200 pb-20">
                    <ProfileItem
                        title="Logout"
                        icon={icons.logout}
                        titleStyle="text-red-500"
                        onPress={handleLogout}
                        showArrow={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
