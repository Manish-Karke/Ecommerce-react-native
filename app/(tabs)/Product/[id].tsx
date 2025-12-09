import { useAxiosFetch } from "@/hooks/AxiosHook";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
 const navigation = useNavigation();
  const { loading, data: product, error } = useAxiosFetch({
    url: `/products/${id}`,
    method: "GET",
  });
  useEffect(() => {
    if (product?.title) {
      navigation.setOptions({ title: product.title });
    }
  }, [product]);
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Loading product...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error || "No product found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-5">
      <Image
        source={{ uri: product.image }}
        style={{
          width: "100%",
          height: 280,
          borderRadius: 10,
          backgroundColor: "#f1f1f1",
        }}
        resizeMode="contain"
      />

      <Text className="text-2xl font-bold mt-4">{product.title}</Text>

      <Text className="text-lg text-blue-600 font-bold mt-2">
        ${product.price}
      </Text>

      <Text className="text-base text-gray-700 mt-4">
        {product.description}
      </Text>
    </ScrollView>
  );
}
