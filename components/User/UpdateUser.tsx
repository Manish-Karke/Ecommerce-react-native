import AddUserForm from "@/components/User/AddUser";
import { QUERY_UPDATEUSER } from "@/graphql/mutation";
import { QUERY_USERLIST } from "@/graphql/query";
import { AddUserFormValues, Users } from "@/types/type";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Modal, Pressable, Text, View } from "react-native";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  selectedUser: Users | null;
  form: UseFormReturn<AddUserFormValues>;
}

export default function EditUserModal({
  visible,
  onClose,
  selectedUser,
  form,
}: EditUserModalProps) {
  const [UPDATEUSER, { loading }] = useMutation(QUERY_UPDATEUSER, {
    refetchQueries: [{ query: QUERY_USERLIST }],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role,
        avatar: selectedUser.avatar,
      });
    }
  }, [selectedUser]);

  const onSubmit: SubmitHandler<AddUserFormValues> = async (values) => {
    if (!selectedUser) return;

    await UPDATEUSER({
      variables: {
        id: selectedUser.id,
        changes: {
          name: form.getValues("name"),
          email: form.getValues("email"),
          role: form.getValues("role"),
          avatar: form.getValues("avatar"),
          ...(form.getValues("password")
            ? { password: form.getValues("password") }
            : {}),
        },
      },
    });

    alert("User updated ✅");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center px-4">
        <View className="bg-white rounded-2xl p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">Edit User</Text>
            <Pressable onPress={onClose}>
              <Text className="text-xl font-bold">✕</Text>
            </Pressable>
          </View>

          <AddUserForm form={form} onSubmit={onSubmit} loading={loading} />
        </View>
      </View>
    </Modal>
  );
}
