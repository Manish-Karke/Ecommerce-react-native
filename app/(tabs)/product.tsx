import CustomButton from "../../components/CustomButton";
import { ProductCard } from "@/components/productCard";
import { useFetch } from "@/hooks/getFetch";
import { useCart } from "@/store/store";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function ProductScreen() {
  const router = useRouter();
  const limit = 20;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading, error, isFetching } = useFetch<any[]>({
    queryKey: ["products", page],
    url: "/products",
    params: { offset: (page - 1) * limit, limit },
  });

  const addToCart = useCart((state) => state.addToCart);

  // Accumulate products on new data
  useEffect(() => {
    if (data && data.length > 0) {
      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newItems = data.filter((item) => !ids.has(item.id));
        return [...prev, ...newItems];
      });
    }
  }, [data]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const hasMore = data ? data.length === limit : true;

  // Initial loading UI
  if (isLoading && page === 1) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-600">Loading products...</Text>
      </View>
    );
  }

  // Error UI
  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-8">
        <Text className="text-red-600 text-center mb-4">
          Failed to load products
        </Text>
        <CustomButton title="Retry" onPress={() => setPage(1)} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
        }}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View className="w-[48%] mb-4">
            <ProductCard
              product={item}
              onPress={() => router.push(`../Product/${item.id}`)}
              onPressAddToCart={() => addToCart({ ...item, quantity: 1 })}
            />
          </View>
        )}
        ListHeaderComponent={
          <Text className="text-2xl font-bold mb-5 px-4">Products</Text>
        }
        ListFooterComponent={
          <>
            {isFetching && (
              <View className="py-8">
                <ActivityIndicator size="large" />
              </View>
            )}

            {!isFetching && hasMore && products.length > 0 && (
              <View className="p-5 pt-0">
                <CustomButton title="Load More" onPress={handleLoadMore} />
              </View>
            )}

            {!hasMore && products.length > 0 && (
              <Text className="text-center text-gray-500 py-6">
                That's all bro...💀💀💀💀
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-500 py-10">
            No products found
          </Text>
        }
      />
    </View>
  );
}
