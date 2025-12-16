import { gql } from "@apollo/client";

// export const QUERY_USERLIST = gql`
//   query ($onBasis: Int, $fromDate: Date, $toDate: Date) {
//     dashboardSalesGraph(
//       onBasis: $onBasis
//       fromDate: $fromDate
//       toDate: $toDate
//     ) {
//       salesCount
//       salesAmount
//       productsCount
//       productsAmount
//       graphData {
//         label
//         salesCount
//         salesAmount
//         productsCount
//         productsAmount
//       }
//     }
//   }
// `;

export const QUERY_USERLIST = gql`
  query {
    users {
      id
      name
      email
      role
      avatar
    }
  }
`;

export const QUERY_GETUSER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
      avatar
    }
  }
`;
