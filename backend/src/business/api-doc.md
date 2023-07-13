# API list

## 1. Get business details

<details>
<summary>Get business details of given id</summary>
<br>

## Get business details

- **Description** : This API is used to get business details of given id.
- **Request type** : query
- **Request body sample**:

  - **Request body**

    ```
    query BusinessDetails($linkId: String!) {
      businessDetails(linkId: $linkId) {
        id
        name
        description
        address
        city
        business_type_id
      }
    }
    ```

- **Response**:

```json
{
  "data": {
    "businessDetails": {
      "id": 1,
      "name": "TestBusiness",
      "description": "Test business",
      "address": "Test address",
      "city": "Surat",
      "business_type_id": 1
    }
  }
}
```

</details>

## 2. Update business details

<details>
<summary>Update business details</summary>
<br>

## Update business details

- **Description** : This API is used to update business details.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
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
    ```

  - **Add variables like below**

    ```
    {
      "linkId": "business_link_id",
      "data": {
        "description" : "Test business details"
      },
    }
    ```

- **Response**:

```json
{
  "data": {
    "updateBusinessDetails": {
      "id": 1,
      "name": "TestBusiness",
      "description": "Test business details",
      "address": "Test address",
      "city": "Surat",
      "business_type_id": 1
    }
  }
}
```

</details>
