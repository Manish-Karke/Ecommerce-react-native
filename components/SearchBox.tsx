import { AntDesign } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { searchCache, searchVar } from "./localState/cache";
import { SEARCH_PRODUCT } from "./localState/localQuery";
import { useDebouncedValue } from "./Debounceforsearch";

type SearchInputProps = {
 
  placeholder?: string;
};

export function SearchInput({
  
  placeholder = "Search...",
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebouncedValue(searchValue,500)
  const handleSearchValue = (value: string) => {
    setSearchValue(value);
    searchCache.writeQuery({
      query: SEARCH_PRODUCT,
      data: {
        searchText: searchVar(debounceSearch),
      },
    });
  };
  return (
    <View className="flex-row px-4 py-3 items-center m-2 border border-gray-300 rounded-lg bg-slate-400">
      <AntDesign name="search" size={24} color="gray" className="mr-2" />
      <TextInput
        value={searchValue}
        placeholder={placeholder}
        onChangeText={handleSearchValue}
        className="flex-1 h-7"
        maxFontSizeMultiplier={2}
      />
    </View>
  );
}
