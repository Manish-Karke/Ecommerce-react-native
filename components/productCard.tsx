import { Product, ProductCardProps } from "@/types/type";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onPressAddToCart,
  containerClass = "",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`bg-white rounded-lg shadow overflow-hidden ${containerClass}`}
    >
      <View style={{ width: "100%", height: 180, backgroundColor: "#f3f4f6" }}>
        <Image
          source={{ uri: product.images[0] || " " }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>

      <View className="p-3">
        <Text className="text-sm text-gray-700" numberOfLines={2}>
          {product.title}
        </Text>

        <Text className="text-lg font-bold text-gray-900 mt-2">
          ${product.price}
        </Text>

        <TouchableOpacity
          onPress={(e) => {
            e?.stopPropagation?.();
            onPressAddToCart?.();
          }}
          className="mt-3 bg-blue-600 py-2.5 rounded-lg"
        >
          <Text className="text-white text-center font-medium">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
