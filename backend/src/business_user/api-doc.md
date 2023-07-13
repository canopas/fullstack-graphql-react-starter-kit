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
    "setBusinessDetails": true
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

## 3. Create user

<details>
<summary>Create user</summary>
<br>

## Create user

- **Description** : This API is used to create business user.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation CreateBusinessUser($data: BusinessUserInput!) {
      createBusinessUser(data: $data) {
        id
        name
        email
        username
      }
    }
    ```

  - **Add variables like below**

    ```
    {
      "data": {
          "name" : "name",
          "email": "email",
          "username":"username"
          "password": "password"
      },
    }
    ```

- **Response**:

```json
{
  "data": {
    "createBusinessUser": {
      "id": 1,
      "name": "test",
      "email": "test@gmail.com",
      "username": "username"
    }
  }
}
```

</details>

## 4. Update user

<details>
<summary>Update user</summary>
<br>

## Update user

- **Description** : This API is used to update business user.
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
      "id": "1",
      "data": {
        "email": "user2@example.com",
      },
    }
    ```

- **Response**:

```json
{
  "data": {
    "updateBusinessUser": {
      "name": "User1",
      "email": "user2@example.com"
    }
  }
}
```

</details>

## 5. Delete user

<details>
<summary>Delete user</summary>
<br>

## Delete user

- **Description** : This API is used to delete business user.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation DeleteBusinessUser($id: Float!) {
      deleteBusinessUser(id: $id)
    }
    ```

  - **Add variables like below**

    ```
    {
      "id": "1",
    }
    ```

- **Response**:

```json
{
  "data": {
    "deleteBusinessUser": true
  }
}
```

</details>
