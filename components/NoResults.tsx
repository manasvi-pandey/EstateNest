import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

const NoResults = () => {
    return (
        <View className="items-center my-5">
            <Image
                source={images.noResult}
                className="w-11/12 h-80"
                resizeMode="contain"
            />
            <Text className="text-black-200 text-2xl font-rubik">
                No results found
            </Text>
            <Text className="text-base text-black-100 font-rubik">
                Try changing or removing some of your filters
            </Text>
        </View>
    );
};

export default NoResults;
