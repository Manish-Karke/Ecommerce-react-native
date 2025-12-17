import { AntDesign } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { searchCache, searchVar } from "./localState/cache";
import { SEARCH_PRODUCT } from "./localState/localQuery";

type SearchInputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
    searchCache.writeQuery({
      query: SEARCH_PRODUCT,
      data: {
        searchText: searchVar(value),
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
