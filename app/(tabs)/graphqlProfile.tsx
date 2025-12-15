
// import { useQuery } from '@apollo/client/react';
// import { QUERY_USERLIST } from '../../graphql/query';
// import { UserResponses, Users } from '../../types/type';

// export default function UserList() {
//   const { loading, error, data } = useQuery<UserResponses>(QUERY_USERLIST);

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const users: Users[] = data?.users || [];

//   return (
//     <div>
//       <h2>User List ({users.length})</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id} style={{ marginBottom: '16px' }}>
//             {/* <img
//               src={user.avatar}
//               alt={user.name}
//               width={50}
//               style={{ borderRadius: '50%', marginRight: '12px' }}
//             /> */}
//             <strong>{user.name}</strong> ({user.email}) — <em>{user.role}</em>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }