import { ProductCard } from "@/components/productCard";
import { useFetch } from "@/hooks/useFetch";
import { useCart } from "@/store/store";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Product } from "../../types/type";
export default function ProductScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const { data, isLoading, isError } = useFetch("/products");

  const addToCart = useCart((state) => state.addToCart);
  const cart = useCart((state) => state.cart);

  console.log(cart);
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center text-red-600">
        <Text>{isError}</Text>
      </View>
    );
  }

  return (
    <View className="p-5 flex-1">
      <Text className="text-xl font-bold mb-4">Products</Text>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={{ width: "48%", marginBottom: 10 }}>
            <ProductCard
              product={item}
              onPress={() => router.push(`../Product/${item.id}`)}
              onPressAddToCart={() =>
                addToCart({
                  ...item,
                  price: item.price,
                  quantity: 1,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}
