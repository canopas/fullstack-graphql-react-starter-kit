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
  query ($businessId: String!) {
    businessDetails(businessId: $businessId) {
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

const GET_CATEGORIES = gql`
  query Categories($businessId: String!) {
    categories(businessId: $businessId) {
      id
      name
      parent_id
    }
  }
`;

const GET_CATEGORY = gql`
  query Category($id: String!) {
    category(id: $id) {
      id
      name
      parent_id
    }
  }
`;

export {
  GET_USERS,
  GET_USER,
  GET_BUSINESS_DETAILS_AND_TYPES,
  GET_CATEGORIES,
  GET_CATEGORY,
};
