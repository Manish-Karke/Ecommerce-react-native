import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function About() {
  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <Text className="text-3xl font-bold mb-4 text-center">Welcome to ShopEasy!</Text>

      <Text className="text-base mb-4 text-gray-700">
        ShopEasy makes online shopping fast and simple. Browse products, add them to your cart, and checkout in just a few taps.
      </Text>

      <Text className="text-xl font-semibold mt-4 mb-2">Our Mission:</Text>
      <Text className="text-base mb-4 text-gray-700">
        To provide a seamless shopping experience with high-quality products at the best prices.
      </Text>

      <Text className="text-xl font-semibold mt-4 mb-2">Features:</Text>
      <View className="mb-4 pl-4">
        <Text className="text-base text-gray-700">• Browse products by categories</Text>
        <Text className="text-base text-gray-700">• Add items to cart and checkout</Text>
        <Text className="text-base text-gray-700">• Track your orders in real-time</Text>
        <Text className="text-base text-gray-700">• Secure payment options</Text>
      </View>

      <Text className="text-xl font-semibold mt-4 mb-2">Contact Us:</Text>
      <Text className="text-base text-gray-700 mb-1">support@shopeasy.com</Text>
      <Text className="text-base text-gray-700 mb-4">Follow us on Instagram and Facebook @ShopEasy</Text>

      <Text className="text-base text-gray-500 mt-8 text-center">
        Developed by DibTech Solutions{"\n"}Version 1.0.0
      </Text>
    </ScrollView>
  );
}
