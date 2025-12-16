import AddUserForm from "@/components/user/AddingFormUser";
import { useQuery } from "@apollo/client/react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { QUERY_USERLIST } from "../../graphql/query";
import { UserResponses, Users } from "../../types/type";

export default function UserList() {
  const { loading, error, data } = useQuery<UserResponses>(QUERY_USERLIST);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );
  }

  const users: Users[] = data?.users || [];

  return (
    <ScrollView>
      <View className="flex-1 p-4 bg-white">
        <section>
          <Text className="text-xl font-bold mb-4">
            User List ({users.length})
          </Text>

          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={<AddUserForm />}
            renderItem={({ item }) => (
              <View className="flex-row items-center mb-4 p-3 bg-gray-100 rounded-xl">
                <Image
                  source={{ uri: item.avatar }}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <View>
                  <Text className="font-semibold text-base">{item.name}</Text>
                  <Text className="text-gray-600 text-sm">{item.email}</Text>
                  <Text className="text-gray-500 italic text-xs">
                    {item.role}
                  </Text>
                </View>
              </View>
            )}
          />
        </section>

        <section>
          <AddUserForm />
        </section>
      </View>
    </ScrollView>
  );
}
