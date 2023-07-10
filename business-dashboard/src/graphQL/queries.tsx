import { gql } from "@apollo/client";

const GET_USERS = gql`
  query businessUsers($businessId: String!) {
    businessUsers(businessId: $businessId) {
      id
      name
      email
      username
    }
  }
`;

const GET_USER = gql`
  query BusinessUser($id: String!) {
    businessUser(id: $id) {
      id
      name
      email
      role_id
      username
      password
    }
  }
`;

export { GET_USERS, GET_USER };
