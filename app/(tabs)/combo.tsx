// import React, { useState, useMemo, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   ActivityIndicator,
//   Pressable,
//   Keyboard,
// } from "react-native";
// import ComboBox from "@/components/DropDownMenu/ComboBox";
// import { MenuOption } from "@/components/DropDownMenu/MenuTrigger";
// import { useFetch } from "@/hooks/getFetch";
// import { User } from "@/types/type";

// const App = () => {
//   const [visible, setVisible] = useState(false);
//   const [search, setSearch] = useState("");
//   const [selectedValue, setSelectedValue] = useState<string>("");
//   const inputRef = useRef<TextInput>(null);

//   const { data, isLoading, error } = useFetch<User[]>({
//     queryKey: ["users"],
//     url: "/users",
//   });

//   const options = useMemo(() =>
//     data?.map((user) => ({
//       label: user.name,
//       value: String(user.id),
//     })) || [],
//   [data]);

//   const filteredOptions = useMemo(() =>
//     options.filter((item) =>
//       item.label.toLowerCase().includes(search.toLowerCase())
//     ),
//   [options, search]);

//   const handleSelect = (value: string, label: string) => {
//     setSelectedValue(value);
//     setSearch(label);
//     setVisible(false);
//     Keyboard.dismiss();
//   };

//   const handleSearchChange = (text: string) => {
//     setSearch(text);
//     // Open dropdown when typing
//     if (!visible) {
//       setVisible(true);
//     }
//     // Clear selection when modifying search
//     if (selectedValue) {
//       setSelectedValue("");
//     }
//   };

//   const handleClear = () => {
//     setSearch("");
//     setSelectedValue("");
//     inputRef.current?.focus();
//   };

//   const toggleDropdown = () => {
//     setVisible(!visible);
//     if (!visible) {
//       inputRef.current?.focus();
//     }
//   };

//   if (isLoading) return <ActivityIndicator size="large" className="mt-10" />;
//   if (error) return <Text className="text-red-500 mt-10 text-center">Error loading users</Text>;

//   return (
//     <View className="flex-1 justify-center items-center px-4">
//       <ComboBox
//         visible={visible}
//         handleOpen={() => setVisible(true)}
//         handleClose={() => setVisible(false)}
//         dropDownWidth={256}
//         trigger={
//           <View className="h-12 w-64 flex-row items-center px-3 rounded-md bg-gray-200 border border-gray-300">
//             <TextInput
//               ref={inputRef}
//               className="flex-1 text-black h-full"
//               placeholder="Search user..."
//               value={search}
//               onChangeText={handleSearchChange}
//               onFocus={() => setVisible(true)}
//               autoCorrect={false}
//               autoCapitalize="none"
//             />

//             {search.length > 0 ? (
//               <Pressable onPress={handleClear} className="p-2">
//                 <Text className="text-gray-500 font-bold">✕</Text>
//               </Pressable>
//             ) : (
//               <Pressable onPress={toggleDropdown} className="p-2">
//                 <Text className="text-gray-500">▼</Text>
//               </Pressable>
//             )}
//           </View>
//         }
//       >
//         <ScrollView
//           className="bg-white border border-gray-200 rounded-md"
//           style={{ maxHeight: 200 }}
//           keyboardShouldPersistTaps="handled"
//           nestedScrollEnabled={true}
//         >
//           {filteredOptions.length === 0 ? (
//             <View className="p-4">
//               <Text className="text-gray-400 text-center">
//                 {search.length > 0 ? "No users found" : "Start typing to search"}
//               </Text>
//             </View>
//           ) : (
//             filteredOptions.map((item) => (
//               <MenuOption
//                 key={item.value}
//                 value={item.value}
//                 onSelect={() => handleSelect(item.value, item.label)}
//                 label={
//                   <View className="flex-row justify-between w-full items-center p-3 border-b border-gray-100">
//                     <Text className={selectedValue === item.value ? 'font-bold text-blue-600' : 'text-gray-800'}>
//                       {item.label}
//                     </Text>
//                   </View>
//                 }
//               />
//             ))
//           )}
//         </ScrollView>
//       </ComboBox>
//     </View>
//   );
// };

// export default App;

import { View, Text, ActivityIndicator } from "react-native";
import SearchableDropdown from "@/components/DropDownMenu/SearchableDropDown";
import { useFetch } from "@/hooks/getFetch";
import { User } from "@/types/type";
import { useMemo } from "react";

export default function Home() {
  const { data, isLoading, error } = useFetch<User[]>({
    queryKey: ["users"],
    url: "/users",
  });

 const dropdownUsers = useMemo(
  () =>
    data?.map((user) => ({
      id: user.id,               
      label: user.name,          
      value: String(user.id),    
    })) || [],
  [data]
);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-600">Loading users list...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="mb-2 font-semibold">Select User</Text>

      <SearchableDropdown
        data={dropdownUsers}
        placeholder="Choose a user"
        onSelect={(item) => {
          console.log("Selected dropdown item:", item);
        }}
      />
    </View>
  );
}
