import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({
    focused,
    icon,
    title,
}: {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}) => (
    <View className="mt-5 items-center justify-center">
        <Image
            source={icon}
            tintColor={focused ? "#2C6E49" : "#666876"}
            resizeMode="contain"
            className="size-6"
        />
        <Text
            className={`text-sm w-full ${
                focused
                    ? "text-primary-300 font-roboto-medium"
                    : "text-black-200 font-rubik"
            }`}
        >
            {title}
        </Text>
    </View>
);

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "absolute",
                    borderTopWidth: 1,
                    minHeight: 70,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.home}
                            focused={focused}
                            title="Home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.search}
                            focused={focused}
                            title="Explore"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.person}
                            focused={focused}
                            title="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
