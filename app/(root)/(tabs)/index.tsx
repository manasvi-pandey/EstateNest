import { Card, FeaturedCard } from "@/components/Card";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import SearchBar from "@/components/SearchBar";
import icons from "@/constants/icons";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/providers/global-provider";
import { getGreeting } from "@/utils";
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

export default function Index() {
    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const { data: latestProperties, loading: latestPropertiesLoading } =
        useAppwrite({
            fn: getLatestProperties,
        });

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

    const greeting = getGreeting();

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

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
                            <View className="flex-row items-center gap-3">
                                <Image
                                    source={{ uri: user?.avatar }}
                                    className="size-12 rounded-full"
                                />
                                <View>
                                    <Text className="font-rubik text-black-100">
                                        {greeting}
                                    </Text>
                                    <Text className="font-rubik text-lg text-black-300">
                                        {user?.name}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Image source={icons.bell} className="size-6" />
                            </View>
                        </View>

                        <SearchBar />

                        <View className="flex-row items-center justify-between mt-6">
                            <Text className="font-roboto-bold text-lg">
                                Featured
                            </Text>
                            <TouchableOpacity onPress={() => alert("View all")}>
                                <Text className="font-roboto-medium text-primary-300">
                                    View all
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {latestPropertiesLoading ? (
                            <ActivityIndicator
                                size="large"
                                className="text-primary-300"
                            />
                        ) : !latestProperties ||
                          latestProperties.length === 0 ? (
                            <NoResults />
                        ) : (
                            <FlatList
                                data={latestProperties}
                                renderItem={({ item }) => (
                                    <FeaturedCard
                                        item={item}
                                        onPress={() =>
                                            handleCardPress(item.$id)
                                        }
                                    />
                                )}
                                keyExtractor={(item) => item.$id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerClassName="gap-4 mt-4"
                            />
                        )}

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
