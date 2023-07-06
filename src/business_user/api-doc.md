# Common Error Codes

- **400** : Bad request - In case any required data is missing in request
- **500** : Internal server error - Any unexpected error
  <br><br>

# API list

## 1. Set business details

<details>
<summary>Set business details</summary>
<br>

## Register business user

- **Description** : This API will use to set business details for the perticular business when admin will approve the business.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation setBusinessDetails($businessId: String!) {
      setBusinessDetails(businessId: $businessId)
    }
    ```

- **Response**:

```json
{
  "data": {
    "createBusinessUser": true
  }
}
```

</details>

## 2. Get business users

<details>
<summary>Get all users of the business</summary>
<br>

## Get users

- **Description** : This API is used to get all users of the business.
- **Request type** : query
- **Request body sample**:

  - **Request body**

    ```
    query businessUsers($businessId: String!) {
      businessUsers(businessId: $businessId) {
        id
        name
        email
      }
    }
    ```

- **Response**:

```json
{
  "data": {
    "users": [
      {
        "id": 1,
        "name": "User1",
        "email": "user1@example.com"
      },
      {
        "id": 2,
        "name": "User2",
        "email": "user2@example.com"
      }
    ]
  }
}
```

</details>
