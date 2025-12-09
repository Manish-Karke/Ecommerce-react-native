import { ProductCard } from "@/components/productCard";
import { useAxiosFetch } from "@/hooks/AxiosHook";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Product } from "../../utils/type";

export default function ProductScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  const { loading, data, error } = useAxiosFetch({
    url: "/products",
    method: "GET",
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center text-red-600">
        <Text>{error}</Text>
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
          <View style={{ width: "48%", marginBottom: 15 }}>
            <ProductCard product={item} />
          </View>
        )}
      />
    </View>
  );
}
