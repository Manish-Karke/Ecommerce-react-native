import { createRenderItem } from "@/components/CartRender";
import { useCart } from "@/store/store";
import { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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

  const renderItem = createRenderItem(addCart, removeCart);

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
