import { useReactiveVar } from "@apollo/client";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { searchVar } from "@/components/localState/cache";
import { ProductCard } from "@/components/productCard";
import { SearchInput } from "@/components/SearchBox";
import { useFetch } from "@/hooks/getFetch";
import { useCart } from "@/store/store";
import CustomButton from "../../components/CustomButton";

export default function ProductScreen() {
  const router = useRouter();
  const addToCart = useCart((state) => state.addToCart);

  const searchText = useReactiveVar(searchVar);
  const prevSearchRef = useRef(searchText);

  const limit = 20;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (prevSearchRef.current !== searchText) {
      prevSearchRef.current = searchText;
      setPage(1);
      setProducts([]);
    }
  }, [searchText]);

  const { data, isLoading, error, isFetching } = useFetch<any[]>({
    queryKey: ["products", page, searchText],
    url: "/products/",
    params: {
      offset: (page - 1) * limit,
      limit,
      title: searchText,
    },
  });

  useEffect(() => {
    if (!data) return;

    setProducts((prev) => {
      if (page === 1) return data;

      const ids = new Set(prev.map((p) => p.id));
      const newItems = data.filter((item) => !ids.has(item.id));
      return [...prev, ...newItems];
    });
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (!isFetching && data && data.length === limit) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, data]);

  const hasMore = data ? data.length === limit : false;

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
      <View>
        <>
          <Text className="text-2xl font-bold mb-3 px-4">Products</Text>
          <SearchInput placeholder="Search products..." />
        </>
      </View>
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
        ListFooterComponent={
          <>
            {isFetching && page > 1 && (
              <View className="py-8">
                <ActivityIndicator size="large" />
              </View>
            )}

            {!isFetching && hasMore && products.length > 0 && (
              <View className="p-5 pt-0">
                <CustomButton title="Load More" onPress={handleLoadMore} />
              </View>
            )}

            {!isFetching && !hasMore && products.length > 0 && (
              <Text className="text-center text-gray-500 py-6">
                That's all bro...💀💀💀💀
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !isFetching ? (
            <Text className="text-center text-gray-500 py-10">
              No products found
            </Text>
          ) : null
        }
      />
    </View>
  );
}
