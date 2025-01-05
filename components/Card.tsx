import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
    item: Models.Document;
    onPress?: () => void;
}

export const FeaturedCard = ({
    item: { name, address, price, image, rating },
    onPress,
}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="w-56 h-72 relative">
            <Image source={{ uri: image }} className="size-full rounded-2xl" />
            <Image
                source={images.cardGradient}
                className="absolute size-full rounded-2xl"
            />
            <View className="flex-row items-center justify-center gap-1 bg-white absolute top-3 right-3 rounded-full p-1 w-14">
                <Image source={icons.star} className="size-3.5" />
                <Text className="text-xs font-roboto-bold text-primary-300">
                    {rating}
                </Text>
            </View>

            <View className="absolute bottom-5 left-4">
                <Text
                    className="font-roboto-bold text-white text-xl"
                    numberOfLines={1}
                >
                    {name}
                </Text>
                <Text className="text-sm font-rubik text-white">{address}</Text>

                <View className="mt-3 flex-row items-center justify-between">
                    <Text className="text-white font-roboto-bold text-xl">
                        &#8377; {price}
                    </Text>
                    <Image source={icons.heart} className="size-5" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const Card = ({
    item: { name, address, price, image, rating },
    onPress,
}: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className="bg-white px-3 py-4 shadow-lg shadow-black-100/70 mb-2">
                <View className="flex-row items-center justify-center gap-1 bg-white absolute top-5 right-5 rounded-full p-1 w-14 z-50">
                    <Image source={icons.star} className="size-3.5" />
                    <Text className="text-xs font-roboto-bold text-primary-300">
                        {rating}
                    </Text>
                </View>
                <Image
                    source={{ uri: image }}
                    className="w-full h-36 rounded-lg"
                />

                <View className="mt-4">
                    <Text className="font-roboto-bold text-md">{name}</Text>
                    <Text className="font-roboto-medium text-xs">
                        {address}
                    </Text>
                </View>

                <View className="mt-4 flex-row items-center justify-between">
                    <Text className="font-roboto-bold">&#8377; {price}</Text>
                    <Image
                        source={icons.heart}
                        className="size-4"
                        tintColor="#191d31"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};
