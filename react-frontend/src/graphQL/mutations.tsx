import { gql } from "@apollo/client";

const CREATE_BUSINESS_MUTATION = gql`
  mutation createBusinessUser($data: UserInput!) {
    createBusinessUser(data: $data) {
      name
      email
      phone
      city
    }
  }
`;

export { CREATE_BUSINESS_MUTATION };
