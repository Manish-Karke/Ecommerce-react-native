import { MenuOptionProps } from "@/types/type";
import { ReactNode } from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";

export const MenuTrigger = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const MenuOption: React.FC<MenuOptionProps> = ({
  label,
  value,
  onSelect,
}) => {
  return (
    <Pressable
      className="px-4 py-2"
      onPress={() => onSelect(value)}
    >
      <Text>{label}</Text>
    </Pressable>
  );
};
