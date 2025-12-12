import CustomButton from "../../components/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { FormInput } from "../../components/formResuable";
import { LoginFormType, LoginSchema } from "../../utils/schema";
import { useSendPost } from "@/hooks/getFetch";

export default function Login() {
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutateAsync, isPending, isError } = useSendPost<{ token: string }>({
    url: "/auth/login",
  });

  const onSubmit = async (data: LoginFormType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const res = await mutateAsync(formData);
      router.replace("/product");
    } catch (err) {
      console.log("Login failed:", err);
    }
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
        <CustomButton
          title={isPending ? "Logging in..." : "Login"}
          variant="primary"
          size="large"
          onPress={handleSubmit(onSubmit)}
          rounded
          fullWidth
          className="shadow-md"
        />
      </View>

      {isError && <Text className="text-red-500 mt-2">Login failed</Text>}
    </View>
  );
}
