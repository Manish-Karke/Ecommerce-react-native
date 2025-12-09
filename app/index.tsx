import { Text, View } from "react-native";
import Login from "./(auth)/login";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center w-full bg-white w-81">
      <Text className="text-xl font-bold text-blue-500 bg-black mb-4">
        Welcome to Login page!
      </Text>
    <View className="w-96 ">

       <Login />
    </View>
     
    </View>
  );
}
