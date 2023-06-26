# Common Error Codes

- **400** : Bad request - In case any required data is missing in request
- **500** : Internal server error - Any unexpected error
  <br><br>

# API list

## 1. Create admin

<details>
<summary>Create admin</summary>
<br>

## Register

- **Description** : This API is used to register the admin from admin panel.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation CreateAdmin($data: AdminInput!) {
      createAdmin(data: $data) {
        name
        email
      }
    }
    ```

  - **Add variables like below**

    ```
    {
      "data": {
          "name" : "name",
          "email": "email",
          "password": "encrypted password"
      },
    }
    ```

- **Response**:

```json
{
  "data": {
    "createAdmin": {
      "name": "test",
      "email": "test@gmail.com"
    }
  }
}
```

</details>

## 2. Admin login

<details>
<summary>Admin login</summary>
<br>

## Admin login

- **Description** : This API is used to login the admin from admin panel.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation AdminLogin($data: AdminInput!) {
      adminLogin(data: $data) {
        name
        email
        role_id
      }
    }
    ```

  - **Add variables like below**

    ```
    {
      "data": {
          "email": "email",
          "password": "encrypted password"
      },
    }
    ```

- **Response**:

```json
{
  "data": {
    "adminLogin": {
      "name": "test",
      "email": "test@gmail.com",
      "role_id": 1
    }
  }
}
```

</details>
