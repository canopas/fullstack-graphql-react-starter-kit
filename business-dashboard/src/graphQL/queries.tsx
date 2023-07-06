import { gql } from "@apollo/client";

const GET_BUSINESS_USERS = gql`
  query businessUsers($businessId: String!) {
    businessUsers(businessId: $businessId) {
      id
      name
      email
    }
  }
`;

export { GET_BUSINESS_USERS };
