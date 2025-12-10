import { useFetch } from "@/hooks/useFetch";
import { useCart } from "@/store/store";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  // FIX: call the store as a hook
  const { addToCart } = useCart();

  const { data: product, isLoading, isError } = useFetch(`/products/${id}`);

  useEffect(() => {
    if (product?.title) {
      navigation.setOptions({ title: product.title });
    }
  }, [product]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Loading product...</Text>
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{isError || "No product found"}</Text>
      </View>
    );
  }

  const handleAdd = () => {
    addToCart(product);
  };

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
      <View className="gap-4 m-4">
        <Button title="Add to Cart" onPress={handleAdd} />
        <Button title="Return Product" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
