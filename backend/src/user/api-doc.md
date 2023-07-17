# API list

## 1. Create user and business

<details>
<summary>Create user and business</summary>
<br>

## Register business user

- **Description** : This API is used to register the user and its business.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation CreateUser($data: UserInput!) {
      createUser(data: $data) {
          name
          email
          phone
          city
      }
    }
    ```

  - **Add variables like below**

    ```
    {
    "data": {
        "name" : "name",
        "city" : "city-name",
        "email": "email",
        "phone" : "phone",
        "business_name": "business name"
    },
    }
    ```

- **Response**:

```json
{
  "data": {
    "createUser": {
      "name": "sumi",
      "email": "sumi@gmail.com",
      "phone": "9999999999",
      "city": "surat"
    }
  }
}
```

</details>

## 2. Get users

<details>
<summary>Get all users with business</summary>
<br>

## Get users

- **Description** : This API is used to get users who are not admins.
- **Request type** : query
- **Request body sample**:

  - **Request body**

    ```
    query Users {
      users {
        id
        name
        email
        city
        business {
          name
        }
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
        "email": "user1@example.com",
        "city": "city",
        "business": {
          "name": "MyBusiness"
        }
      },
      {
        "id": 2,
        "name": "User2",
        "email": "user2@example.com",
        "city": "city",
        "business": null
      }
    ]
  }
}
```

</details>

## 3. Get user by ID

<details>
<summary>Get user by given id</summary>
<br>

## Get user by ID

- **Description** : This API is used to get user by given id.
- **Request type** : query
- **Request body sample**:

  - **Request body**

    ```
    query FindUser($id: String!) {
        user(id: $id) {
          id
          name
          email
          city
          business {
            name
          }
        }
      }
    ```

  - **Add variable like below**

    ```
    {
      "id": "1",
    }
    ```

- **Response**:

```json
{
  "data": {
    "user": {
      "id": 1,
      "name": "User1",
      "email": "user1@example.com",
      "city": "city",
      "business": {
        "name": "MyBusiness"
      }
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

- **Description** : This API is used to update user.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation UpdateUser($id: String!, $data: UserInput!) {
      updateUser(id: $id, data: $data) {
        name
        email
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
    "updateUser": {
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

- **Description** : This API is used to delete user.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation DeleteUser($id: Float!) {
      deleteUser(id: $id)
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
    "deleteUser": true
  }
}
```

</details>
