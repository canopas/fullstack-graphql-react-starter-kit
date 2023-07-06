import { gql } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    users {
      id
      name
      email
      city
      username
      password
      business {
        name
        status
        link_id
      }
    }
  }
`;

const GET_USER = gql`
  query FindUser($id: String!) {
    user(id: $id) {
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

export { GET_USERS, GET_USER };
