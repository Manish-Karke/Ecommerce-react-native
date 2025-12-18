import AddUserForm from "@/components/User/AddUser";
import { QUERY_ADDUSER, QUERY_UPDATEUSER } from "@/graphql/mutation";
import { QUERY_USERLIST } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { AddUserFormValues, UserResponses, Users } from "../../types/type";

export default function UserList() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  // Fetch all users
  const { loading, error, data } = useQuery<UserResponses>(QUERY_USERLIST);

  // Add form
  const addForm = useForm<AddUserFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
      avatar: "https://placehold.co/100x100",
    },
  });

  // Edit form
  const editForm = useForm<AddUserFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
      avatar: "",
    },
  });

  // Pre-fill edit form when a user is selected
  useEffect(() => {
    if (selectedUser) {
      editForm.reset({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role,
        avatar: selectedUser.avatar,
      });
    }
  }, [selectedUser]);

  // Mutations
  const [ADDUSER, { loading: addLoading }] = useMutation(QUERY_ADDUSER, {
    refetchQueries: [{ query: QUERY_USERLIST }],
    awaitRefetchQueries: true,
  });

  const [UPDATEUSER, { loading: updateLoading }] = useMutation(
    QUERY_UPDATEUSER,
    {
      refetchQueries: [{ query: QUERY_USERLIST }],
      awaitRefetchQueries: true,
    }
  );

  // Add User submit
  const onAddSubmit: SubmitHandler<AddUserFormValues> = async (values) => {
    await ADDUSER({ variables: { data: values } });
    alert("User created successfully ✅");
    addForm.reset();
    setAddOpen(false);
  };

  // Edit User submit
  const onEditSubmit: SubmitHandler<AddUserFormValues> = async (values) => {
    if (!selectedUser) return;

    try {
      await UPDATEUSER({
        variables: {
          id: selectedUser.id,
          changes: {
            name: editForm.getValues("name"),
            email: editForm.getValues("email"),
            role: editForm.getValues("role"),
            avatar: editForm.getValues("avatar"),
            ...(editForm.getValues("password")
              ? { password: editForm.getValues("password") }
              : {}),
          },
        },
      });

      alert("User updated ✅");
      setEditOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        className="flex-1 justify-center items-center"
      />
    );

  if (error) return <Text className="text-red-500 p-4">{error.message}</Text>;

  const users = data?.users ?? [];

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">
              User List ({users.length})
            </Text>

            <Pressable
              onPress={() => setAddOpen(true)}
              className="bg-blue-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Add User</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setSelectedUser(item);
              setEditOpen(true);
            }}
            className="flex-row items-center mb-4 p-3 bg-gray-100 rounded-xl"
          >
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="font-semibold text-base">{item.name}</Text>
              <Text className="text-gray-600 text-sm">{item.email}</Text>
              <Text className="text-gray-500 italic text-xs">{item.role}</Text>
            </View>
          </Pressable>
        )}
      />

      <Modal
        visible={addOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setAddOpen(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-4">
          <View className="bg-white rounded-2xl p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold">Add New User</Text>
              <Pressable onPress={() => setAddOpen(false)}>
                <Text className="text-xl font-bold">✕</Text>
              </Pressable>
            </View>

            <AddUserForm
              form={addForm}
              onSubmit={onAddSubmit}
              loading={addLoading}
            />
          </View>
        </View>
      </Modal>

      {/* EDIT USER MODAL */}
      <Modal
        visible={editOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setEditOpen(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-4">
          <View className="bg-white rounded-2xl p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold">Edit User</Text>
              <Pressable onPress={() => setEditOpen(false)}>
                <Text className="text-xl font-bold">✕</Text>
              </Pressable>
            </View>

            <AddUserForm
              form={editForm}
              onSubmit={onEditSubmit}
              loading={updateLoading}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
