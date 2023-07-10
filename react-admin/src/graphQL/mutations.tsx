import { gql } from "@apollo/client";

const REGISTRATION = gql`
  mutation CreateAdmin($data: AdminInput!) {
    createAdmin(data: $data) {
      name
      email
    }
  }
`;

const LOGIN = gql`
  mutation AdminLogin($data: AdminInput!) {
    adminLogin(data: $data) {
      name
      email
      role_id
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Float!) {
    deleteUser(id: $id)
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $data: UserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      phone
      city
      role_id
      gender
      username
      password
      business {
        name
        description
        address
      }
    }
  }
`;

const SET_BUSINESS_DETAILS = gql`
  mutation setBusinessDetails($businessId: String!) {
    setBusinessDetails(businessId: $businessId)
  }
`;

export { REGISTRATION, LOGIN, DELETE_USER, UPDATE_USER, SET_BUSINESS_DETAILS };
