import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

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
  return (
   <View className="flex-row px-4 py-3 items-center m-2 border border-gray-300 rounded-lg bg-slate-400">
  <AntDesign name="search" size={24} color="gray" className="mr-2" />
  <TextInput
    value={value}
    placeholder={placeholder}
    onChangeText={onChange}
    className="flex-1 h-7"
    maxFontSizeMultiplier={2}
  />
</View>

  );
}
