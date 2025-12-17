import { DataTable } from "@/components/DataTable";
import { searchVar } from "@/components/localState/cache";
import { SearchInput } from "@/components/SearchBox";
import { useFetch } from "@/hooks/getFetch";
import { User } from "@/types/type";
import { useReactiveVar } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const searchText = useReactiveVar(searchVar);

  const { data, isLoading, error } = useFetch<User[]>({
    queryKey: ["users"],
    url: "/users",
  });

  const filteredUsers = React.useMemo(() => {
    if (!data) return [];
    if (!searchText) return data;
    const lower = searchText.toLowerCase();
    return data.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower)
    );
  }, [data, searchText]);

  const columns: ColumnDef<User>[] = [
    { header: "Id", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Password", accessorKey: "password" },
    { header: "Role", accessorKey: "role" },
    { header: "Avatar", accessorKey: "avatar" },
  ];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-600">Loading users list...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-8">
        <Text className="text-red-600 text-center mb-4">
          Failed to load users
        </Text>
      </View>
    );
  }

  return (
    
    <SafeAreaView style={{ flex: 1 }}>
       <View>
              <>
                <Text className="text-2xl font-bold mb-3 px-4">Products</Text>
                <SearchInput placeholder="Search products..." />
              </>
            </View>
      <View className="items-center mt-4">
        <Text className="font-bold text-xl">Users Table</Text>
      </View>

      {filteredUsers.length === 0 ? (
        <Text className="text-center mt-4">No users found.</Text>
      ) : (
        <DataTable<User> data={filteredUsers} columns={columns} />
      )}
    </SafeAreaView>
  );
};

export default Profile;
