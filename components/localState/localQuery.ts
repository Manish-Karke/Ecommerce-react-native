import { gql } from "@apollo/client";

export const SEARCH_PRODUCT = gql`
  query SEARCH_PRODUCT {
    searchKeyword @client
  }
`;
