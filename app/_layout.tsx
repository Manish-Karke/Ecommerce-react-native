import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import { ApolloProvider } from "@apollo/client/react";
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
