import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const createRenderItem = (addCart: any, removeCart: any) => {
  return ({ item }: any) => {
    const title = item?.title ?? "No title";
    const safeTitle = title.length > 15 ? `${title.slice(0, 15)}...` : title;

    return (
      <View className="flex-row justify-between items-center py-2 border-b border-gray-300">
        <Text className="flex-1 text-gray-800 text-sm">{safeTitle}</Text>

        <View className="flex-row items-center mx-2">
          <TouchableOpacity
            className="bg-blue-600 px-2 py-1 rounded"
            onPress={() => removeCart(item.id)}
            disabled={item?.quantity <= 0}
          >
            <Text className="text-white text-base">-</Text>
          </TouchableOpacity>

          <Text className="mx-2 text-sm">{item?.quantity ?? 0}</Text>

          <TouchableOpacity
            className="bg-blue-600 px-2 py-1 rounded"
            onPress={() => addCart(item)}
          >
            <Text className="text-white text-base">+</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-800 text-sm w-16 text-right">
          ${((item?.price ?? 0) * (item?.quantity ?? 0)).toFixed(2)}
        </Text>
      </View>
    );
  };
};
