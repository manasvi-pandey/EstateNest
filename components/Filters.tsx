import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";

interface FilterItemProp {
    category: { title: string; category: string };
    selectedFilter: string;
    onPress?: () => void;
}

const FilterItem = ({ category, selectedFilter, onPress }: FilterItemProp) => {
    return (
        <TouchableOpacity
            className={`mr-4 rounded-full px-4 py-2 ${
                selectedFilter === category.category
                    ? "bg-primary-300"
                    : "bg-primary-100 border border-primary-200"
            }`}
            onPress={onPress}
        >
            <Text
                className={`font-rubik ${
                    selectedFilter === category.category
                        ? "text-white"
                        : "text-black-300"
                }`}
            >
                {category.title}
            </Text>
        </TouchableOpacity>
    );
};

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedFilter, setSelectedFilter] = useState("All");

    const handleFilterSelection = (category: string) => {
        if (category === selectedFilter) {
            setSelectedFilter("All");
            router.setParams({ filter: "All" });
            return;
        }

        setSelectedFilter(category);
        router.setParams({ filter: category });
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 mb-4"
        >
            {categories.map((category, index) => (
                <FilterItem
                    key={index}
                    category={category}
                    selectedFilter={selectedFilter}
                    onPress={() => handleFilterSelection(category.category)}
                />
            ))}
        </ScrollView>
    );
};

export default Filters;
