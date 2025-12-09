import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: keyof T;
  placeholder: string;
  keyboardType?: TextInputProps["keyboardType"];
  secureTextEntry?: boolean;

  errors?: any;
};

export function FormInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  keyboardType,
  secureTextEntry,
  errors,
}: FormInputProps<T>) {
  return (
    <View className="mb-4">
      <Controller
        control={control}
        name={name as any}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            className="border border-gray-400 px-4 py-3 rounded-xl m-2 w-full"
          />
        )}
      />
      {errors?.[name] && (
        <Text className="text-red-700 mt-2">{errors[name]?.message}</Text>
      )}
    </View>
  );
}
