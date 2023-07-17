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

const UPDATE_BUSINESS_DETAILS = gql`
  mutation UpdateBusinessDetails($businessId: String!, $data: BusinessInput!) {
    updateBusinessDetails(businessId: $businessId, data: $data) {
      id
      name
      description
      address
      city
      business_type_id
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      id
      name
      parent_id
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String!, $data: CategoryInput!) {
    updateCategory(id: $id, data: $data) {
      id
      name
      parent_id
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Float!) {
    deleteCategory(id: $id)
  }
`;

export {
  LOGIN,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  UPDATE_BUSINESS_DETAILS,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
};
