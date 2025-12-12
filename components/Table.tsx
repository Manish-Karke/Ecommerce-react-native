// import { View, Text, ActivityIndicator } from 'react-native'
// import React from 'react'
// import { useFetch } from '@/hooks/getFetch'

// const Table = () => {

//   const {
//     isLoading,
//     isFetching,
//     error,
//     data,
//     refetch,
//   } =useFetch<any>({
//     queryKey:["users"],
//     url:"/users"}
//   )


//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" />
//         <Text className="mt-2">Loading product...</Text>
//       </View>
//     );
//   }


//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-red-500">{"No product found"}</Text>
//       </View>
//     );
//   }

//   return (

//   <View className='flex-row bg-gray-500 p-3 rounded'>
//     {table.getHeaderGroup()[0].headers.map((header,i)=>(
//        <Text key={i} className="flex-1 font-bold">
//             {header.column.columnDef.header}
//       </Text>
//     ))}
//   </View>


//   <FlatList
//       data={table.getRoleModel().rows}
//       keyExtractore={(row)=>row.id}
//       renderItem={({item})}=>(
//           <View className="flex-row p-3 border-b border-gray-300 items-center">
//             {item.getVisibleCells().map((cell, i) => (
//               <View key={i} className="flex-1">
//                 {typeof cell.getValue() === "string" ||
//                 typeof cell.getValue() === "number" ? (
//                   <Text>{cell.getValue() as any}</Text>
//                 ) : (
//                   cell.renderCell()
//                 )}
//               </View>
//             ))}
//           </View>
      

 
//   )
// }

// export default Table