import { FormInput } from "@/components/formResuable";
import { AddUserFormValues } from "@/types/type";
import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

type AddUserFormProps = {
  form: UseFormReturn<AddUserFormValues>;
  onSubmit: SubmitHandler<AddUserFormValues>;
  loading?: boolean;
  error?: any;
};
export default function AddUserForm({
  form,
  onSubmit,
  loading,
  error,
}: AddUserFormProps) {
  const { control, handleSubmit, formState } = form;
  const { errors } = formState;
  return (
    <View>
      

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
        onPress={form.handleSubmit(onSubmit)}
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
