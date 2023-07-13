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

const GET_BUSINESS_DETAILS_AND_TYPES = gql`
  query ($linkId: String!) {
    businessDetails(linkId: $linkId) {
      id
      name
      description
      address
      city
      business_type_id
    }
    businessTypes {
      id
      type
    }
  }
`;

export { GET_USERS, GET_USER, GET_BUSINESS_DETAILS_AND_TYPES };
