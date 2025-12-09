import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { FormInput } from "../../components/formResuable";
import { LoginFormType, LoginSchema } from "../../utils/schema";

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
    router.replace("/product");

  };

  return (
    <View className="w-96 justify-center px-5">
      <Text className="font-bold flex justify-center items-center">
        Login Page
      </Text>

      <FormInput
        control={control}
        name="email"
        placeholder="Enter email"
        keyboardType="email-address"
        errors={errors}
      />

      <FormInput
        control={control}
        name="password"
        placeholder="Enter password"
        secureTextEntry
        errors={errors}
      />

      <View className="mt-4 w-full">
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-blue-500 rounded-lg py-2 px-8 items-center justify-center "
        >
          <Text className="text-white font-bold text-base">Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
