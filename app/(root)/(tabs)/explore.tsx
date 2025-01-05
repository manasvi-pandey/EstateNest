import { Card } from "@/components/Card";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import SearchBar from "@/components/SearchBar";
import icons from "@/constants/icons";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Explore() {
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const {
        data: properties,
        loading,
        refetch,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        },
        skip: true,
    });

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        });
    }, [params.filter, params.query]);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    const handleBackPress = () => router.push("/");

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={properties}
                renderItem={({ item }) => (
                    <View className="px-2 gap-2">
                        <Card
                            item={item}
                            onPress={() => handleCardPress(item.$id)}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.$id}
                numColumns={1}
                contentContainerClassName="pb-16"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator
                            size="large"
                            className="text-primary-300"
                        />
                    ) : (
                        <NoResults />
                    )
                }
                ListHeaderComponent={
                    <View className="px-4 py-4">
                        <View className="flex-row items-center justify-between">
                            <TouchableOpacity onPress={handleBackPress}>
                                <Image
                                    source={icons.backArrow}
                                    className="size-6"
                                />
                            </TouchableOpacity>
                            <Text className="font-roboto-medium text-xl">
                                Search for your Ideal Home
                            </Text>
                            <Image source={icons.bell} className="size-6" />
                        </View>

                        <SearchBar />

                        <View className="flex-row items-center justify-between mt-8">
                            <Text className="font-roboto-bold text-lg">
                                Our Recommendations
                            </Text>
                            <TouchableOpacity onPress={() => alert("View all")}>
                                <Text className="font-roboto-medium text-primary-300">
                                    View all
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Filters />
                    </View>
                }
            />
        </SafeAreaView>
    );
}
