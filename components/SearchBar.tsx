import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";

import { useDebouncedCallback } from "use-debounce";
import icons from "@/constants/icons";

const SearchBar = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query: string }>();
    const [search, setSearch] = useState(params.query);

    const debounced = useDebouncedCallback((value: string) => {
        router.setParams({ query: value });
    }, 500);

    const handleSearch = (text: string) => {
        setSearch(text);
        debounced(text);
    };

    return (
        <View className="mt-5 p-3 border border-slate-100 rounded-full flex-row items-center justify-between">
            <View className="flex-row gap-3">
                <Image source={icons.search} className="size-5" />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search for an Estate"
                    placeholderTextColor="#666"
                    className="font-rubik text-black-300 text-md shadow-sm"
                />
            </View>
            <Image source={icons.filter} className="size-5" />
        </View>
    );
};

export default SearchBar;
