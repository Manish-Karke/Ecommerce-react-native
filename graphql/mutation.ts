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

export const QUERY_ADDUSER = gql`
  mutation addUser($data: CreateUserDto!) {
    addUser(data: $data) {
      id
      email
      name
      avatar
      role
    }
  }
`;

export const QUERY_UPDATEUSER = gql`
  mutation UpdateUser($id: ID!, $changes: UpdateUserDto!) {
    updateUser(id: $id, changes: $changes) {
      id
      name
      email
      role
      avatar
    }
  }
`;
