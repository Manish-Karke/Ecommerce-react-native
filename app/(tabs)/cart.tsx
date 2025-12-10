import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useCart } from "@/store/store";
import { useShallow } from "zustand/shallow";

export default function Cart() {
  const { count, cart, clearCart, addCart, removeCart } = useCart(
    useShallow((state) => ({
      count: state.count,
      cart: state.cart,
      clearCart: state.clearCart,
      addCart: state.addToCart,
      removeCart: state.removeCart,
    }))
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const renderItem = ({item}:any) => (
    <View className="flex-row justify-between items-center py-2 border-b border-gray-300">
      <Text className="flex-1 text-gray-800 text-sm">
        {item.title.length > 15 ? `${item.title.slice(0, 15)}...` : item.title}
      </Text>

      <View className="flex-row items-center mx-2">
        <TouchableOpacity
          className="bg-blue-600 px-2 py-1 rounded"
          onPress={() => removeCart(item.id)}
          disabled={item.quantity <= 0}
        >
          <Text className="text-white text-base">-</Text>
        </TouchableOpacity>

        <Text className="mx-2 text-sm">{item.quantity}</Text>

        <TouchableOpacity className="bg-blue-600 px-2 py-1 rounded" onPress={() => addCart(item)}>
          <Text className="text-white text-base">+</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-800 text-sm w-16 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View className="p-4 bg-gray-200 rounded-md flex-1">
      <Text className="text-lg font-bold mb-4">Cart</Text>

      {cart.length === 0 ? (
        <Text className="text-center text-gray-500 mt-6">Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <View className="flex-row justify-between mt-4 border-t border-gray-400 pt-2">
        <Text className="text-sm font-semibold">Total Items:</Text>
        <Text className="text-sm font-semibold">{count}</Text>
      </View>

      <View className="flex-row justify-between mt-1">
        <Text className="text-sm font-semibold">Total Price:</Text>
        <Text className="text-sm font-semibold">${totalPrice.toFixed(2)}</Text>
      </View>

     
      {cart.length > 0 && (
        <TouchableOpacity
          className="bg-red-600 px-4 py-2 rounded mt-4 items-center"
          onPress={clearCart}
        >
          <Text className="text-white font-semibold">Clear Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
