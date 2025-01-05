import {
    View,
    Text,
    Image,
    Dimensions,
    Platform,
    TouchableOpacity,
    ImageSourcePropType,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Alert,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { facilities } from "@/constants/data";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

import * as Linking from "expo-linking";

interface PropertyFeatureProps {
    icon: ImageSourcePropType;
    title: string;
}

const PropertyFeature = ({ icon, title }: PropertyFeatureProps) => {
    return (
        <View className="flex-row items-center gap-4">
            <Image source={icon} className="size-5" />
            <Text className="text-sm font-rubik">{title}</Text>
        </View>
    );
};

const PropertyFacility = ({ icon, title }: PropertyFeatureProps) => {
    return (
        <View className="gap-1 items-center justify-center w-1/4 mb-8">
            <View className="bg-primary-100 rounded-full p-2">
                <Image source={icon} className="size-8" />
            </View>
            <Text className="text-sm font-rubik">{title}</Text>
        </View>
    );
};

const handleEmailing = (recipient: string, name: string) => {
    const subject = "New Enquiry about property";
    const body =
        "Hello, I would like to know more about this property listed as name: " +
        name;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(mailtoLink)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(mailtoLink);
            } else {
                Alert.alert(
                    "Unable to send email",
                    "Failed to open email app. You might not have an email ID configured on this device"
                );
            }
        })
        .catch((error) => {
            console.error("Failed to open email app:", error);
            Alert.alert(
                "Error",
                "Something went wrong while opening the email app."
            );
        });
};

const handleCalling = (phone: string) => {
    const telUrl = `tel:${phone}`;

    Linking.canOpenURL(telUrl)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(telUrl);
            } else {
                Alert.alert("Error", "This device cannot make calls.");
            }
        })
        .catch((error) => {
            console.error("Failed to open dialer:", error);
            Alert.alert(
                "Error",
                "Something went wrong while opening the dialer."
            );
        });
};

const Property = () => {
    const windowHeight = Dimensions.get("window").height;
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data } = useAppwrite({
        fn: getPropertyById,
        params: {
            id,
        },
    });

    if (!data) {
        return (
            <View className="items-center justify-center h-full">
                <ActivityIndicator className="text-primary-300" size="large" />
            </View>
        );
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="relative" style={{ height: windowHeight / 2 }}>
                    <Image
                        source={images.newYork}
                        className="size-full"
                        resizeMode="cover"
                    />
                    <Image source={images.whiteGradient} className="absolute" />

                    <View
                        className="w-full z-50 absolute px-4 flex-row items-center justify-between"
                        style={{ top: Platform.OS === "ios" ? 70 : 40 }}
                    >
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                source={icons.backArrow}
                                className="size-6"
                            />
                        </TouchableOpacity>

                        <View className="flex-row gap-4">
                            <Image
                                source={icons.heart}
                                className="size-6"
                                tintColor="#191D31"
                            />
                            <Image source={icons.send} className="size-6" />
                        </View>
                    </View>
                </View>

                <View className="mt-4 px-4 gap-4">
                    <Text className="font-roboto-bold text-2xl">
                        {data?.name}
                    </Text>
                    <View className="flex-row items-center gap-4">
                        <View className="bg-primary-100 px-2 py-1 rounded-full">
                            <Text className="text-sm font-rubik">
                                {data?.type}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Image source={icons.star} className="size-4" />
                            <Text className="text-sm">
                                {data?.rating} (
                                {data?.reviews.length > 1
                                    ? `${data?.reviews.length} Reviews`
                                    : `${data?.reviews.length} Review`}
                                )
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="mt-6 px-4 flex-row justify-between">
                    <PropertyFeature icon={icons.bed} title="3 Bedrooms" />
                    <PropertyFeature icon={icons.bath} title="2 Bathrooms" />
                    <PropertyFeature icon={icons.area} title="2000 sq. ft" />
                </View>

                <View className="mt-10 px-4">
                    <Text className="font-roboto-medium text-xl">
                        Owner Information
                    </Text>
                    <View className="mt-4 flex-row items-center">
                        <View className="flex-row items-center gap-2">
                            <Image
                                source={{ uri: data?.agent?.avatar }}
                                className="size-14 rounded-full"
                            />
                            <View>
                                <Text className="font-roboto-medium text-md">
                                    {data?.agent?.name}
                                </Text>
                                <Text className="text-sm text-black-200">
                                    {data?.agent?.email}
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row gap-4 ml-auto">
                            <TouchableOpacity
                                onPress={() =>
                                    handleEmailing(
                                        data?.agent?.email,
                                        data?.name
                                    )
                                }
                            >
                                <Image source={icons.chat} className="size-6" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    handleCalling(data?.agent?.phone)
                                }
                            >
                                <Image
                                    source={icons.phone}
                                    className="size-6"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="mt-6 px-4">
                    <Text className="font-roboto-medium text-xl">Overwiew</Text>
                    <Text className="mt-4 text-sm text-black-200">
                        {data?.description}
                    </Text>
                </View>

                <View className="mt-6 px-4">
                    <Text className="font-roboto-medium text-xl">
                        Facilities
                    </Text>
                    <View className="mt-6 flex-row flex-wrap">
                        {facilities.map((facility, index) => (
                            <PropertyFacility
                                key={index}
                                icon={facility.icon}
                                title={facility.title}
                            />
                        ))}
                    </View>
                </View>

                <View className="mt-2">
                    <Text className="font-roboto-medium text-xl px-4">
                        Gallery
                    </Text>
                    <FlatList
                        data={[
                            { id: 1, image: images.newYork },
                            { id: 2, image: images.japan },
                            { id: 3, image: images.newYork },
                            { id: 4, image: images.japan },
                        ]}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Image
                                source={item.image}
                                className="size-44 mr-4 rounded-lg"
                            />
                        )}
                        contentContainerClassName="mt-6 px-2 gap-2 pr-20"
                    />
                </View>

                <View className="px-4 mt-6">
                    <Text className="font-roboto-medium text-xl">Location</Text>
                    <View className="flex-row gap-2 mt-2">
                        <Image source={icons.location} className="size-5" />
                        <Text>{data?.address}</Text>
                    </View>
                    <Image
                        source={images.map}
                        className="w-full h-52 mt-4 rounded-md"
                        resizeMode="cover"
                    />
                </View>
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 bg-white px-8 py-4 h-28">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="font-rubik text-lg">Price</Text>
                        <Text className="font-roboto-bold text-xl">
                            Rs. {data?.price}
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="bg-primary-300 px-10 py-4 rounded-full items-center justify-center"
                        onPress={() => alert("Buy now functionalities")}
                    >
                        <Text className="text-white">Book now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default Property;
