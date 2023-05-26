import { gql } from "@apollo/client";

const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      name
      email
      phone
      city
    }
  }
`;

export { CREATE_BUSINESS_MUTATION };
