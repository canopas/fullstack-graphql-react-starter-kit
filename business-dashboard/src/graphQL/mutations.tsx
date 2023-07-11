import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
      name
      email
      role_id
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateBusinessUser($data: BusinessUserInput!) {
    createBusinessUser(data: $data) {
      id
      name
      email
      username
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteBusinessUser($id: Float!) {
    deleteBusinessUser(id: $id)
  }
`;

const UPDATE_USER = gql`
  mutation UpdateBusinessUser($id: String!, $data: BusinessUserInput!) {
    updateBusinessUser(id: $id, data: $data) {
      id
      name
      email
      role_id
      username
      password
    }
  }
`;

export { LOGIN, CREATE_USER, DELETE_USER, UPDATE_USER };
