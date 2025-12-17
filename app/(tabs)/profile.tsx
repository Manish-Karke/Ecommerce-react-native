import { DataTable } from "@/components/DataTable";
import { debouncedWriteSearch } from "@/components/Debounceforsearch";
import { searchVar } from "@/components/localState/cache";
import { SearchInput } from "@/components/SearchBox";
import { useFetch } from "@/hooks/getFetch";
import { User, UserResponse } from "@/types/type";
import { useReactiveVar } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {

  const searchText = useReactiveVar(searchVar);
  const { data, isLoading } = useFetch<UserResponse>({
    queryKey: ["users"],
    url: "/users",
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-600">Loading users list...</Text>
      </View>
    );
  }

const columns: ColumnDef<User>[] = [
  { header: "Id", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Password", accessorKey: "password" },
  { header: "Role", accessorKey: "role" },
  { header: "Avatar", accessorKey: "avatar" },
];

  return (

    <SafeAreaView style={{ flex: 1 }}>
        
                <>
                  <Text className="text-2xl font-bold mb-3 px-4">User List</Text>
                  <SearchInput
                    value={searchText || ""}
                    placeholder="Search name..."
                    onChange={debouncedWriteSearch}
                  />
                </>
              
      <View className="items-center mt-4">
        <Text className="font-bold text-xl">Users Table</Text>
      </View>

      {data?.users?.length === 0 ? (
        <Text className="text-center mt-4">No users found.</Text>
      ) : (
        <DataTable data={data||[]} columns={columns} />
      )}
    </SafeAreaView>
  );
};

export default Profile;
