import AddUserForm from "@/components/User/AddingFormUser";
import { QUERY_ADDUSER } from "@/graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { QUERY_USERLIST } from "../../graphql/query";
import { AddUserFormValues, UserResponses, Users } from "../../types/type";

export default function UserList() {
  // Fetch users
  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery<UserResponses>(QUERY_USERLIST);

  // Form setup
  const form =
    useForm<AddUserFormValues>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        role: "admin",
        avatar: "https://placehold.co/100x100",
      },
    });

  // Mutation setup
  const [ADDUSER, { loading: mutationLoading, error: mutationError }] =
    useMutation(QUERY_ADDUSER, {
      refetchQueries: [{ query: QUERY_USERLIST }], // optional: automatically refetch users
      awaitRefetchQueries: true,
    });

    
  // Form submit handler
  const onSubmit: SubmitHandler<AddUserFormValues> = async (data) => {
    try {
      await ADDUSER({ variables: { data } });
      alert("User created successfully ✅");
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  // Loading/Error states
  if (queryLoading)
    return (
      <ActivityIndicator
        size="large"
        className="flex-1 justify-center items-center"
      />
    );
  if (queryError)
    return <Text className="text-red-500 p-4">{queryError.message}</Text>;

  const users: Users[] = data?.users || [];

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <Text className="text-xl font-bold mb-4">
              User List ({users.length})
            </Text>
            <View className="mb-6">
              <AddUserForm
                form={form}
                onSubmit={onSubmit}
                loading={mutationLoading}
                error={mutationError}
              />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-4 p-3 bg-gray-100 rounded-xl">
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="font-semibold text-base">{item.name}</Text>
              <Text className="text-gray-600 text-sm">{item.email}</Text>
              <Text className="text-gray-500 italic text-xs">{item.role}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
