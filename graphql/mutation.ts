import { gql } from "@apollo/client";

export const TOGGLE_IS_SELECTED_TABLE = gql`
  mutation ($objectId: String!, $isSelected: Boolean) {
    toggleIsSelected(input: { objectId: $objectId, isSelected: $isSelected }) {
      success
      errors
      message
      clientMutationId
    }
  }
`;
