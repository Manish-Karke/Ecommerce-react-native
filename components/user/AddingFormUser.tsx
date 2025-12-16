import { FormInput } from "@/components/formResuable";
import { AddUserFormValues } from "@/types/type";
import { useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { QUERY_ADDUSER } from "../../graphql/mutation";

export default function AddUserForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
      avatar: "https://placehold.co/100x100",
    },
  });

  const [ADDUSER, { loading, error }] = useMutation(QUERY_ADDUSER);

  const onSubmit: SubmitHandler<AddUserFormValues> = async (data) => {
    try {
      await ADDUSER({
        variables: { data },
      });
      alert("User created successfully ✅");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text className="font-bold items-center ml-10 justify-items-center bg-slate-500 mt-4">
        Adding new user
      </Text>
      <FormInput
        control={control}
        name="name"
        placeholder="Name"
        errors={errors}
      />
      <FormInput
        control={control}
        name="email"
        placeholder="Email"
        errors={errors}
        keyboardType="email-address"
      />
      <FormInput
        control={control}
        name="password"
        placeholder="Password"
        errors={errors}
        secureTextEntry
      />
      <FormInput
        control={control}
        name="role"
        placeholder="Role (admin/customer)"
        errors={errors}
      />
      <FormInput
        control={control}
        name="avatar"
        placeholder="Avatar URL"
        errors={errors}
      />

      <TouchableOpacity
        className="bg-red-600 p-5 rounded-xl mt-2"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-yellow-500 text-center font-bold">
          {loading ? "creating..." : "create user"}
        </Text>
      </TouchableOpacity>
      {error && <Text className="text-red-600 mt-4">{error.message}</Text>}
    </View>
  );
}
