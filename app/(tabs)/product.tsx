import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import axios from "axios";
import { ProductCard } from "@/components/productCard";
import { Product } from "../../utils/type";

export default function ProductScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-5">
      <Text className="text-xl font-bold mb-4">Products</Text>

      <View className="flex-row flex-wrap justify-between">
        {products.map((item) => (
          <View key={item.id} style={{ width: "48%", marginBottom: 15 }}>
            <ProductCard product={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
