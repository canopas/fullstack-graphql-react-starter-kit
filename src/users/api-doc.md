# Common Error Codes

- **400** : Bad request - In case any required data is missing in request
- **500** : Internal server error - Any unexpected error
  <br><br>

# API list

## 1. Create user and business

<details>
<summary>Create user and business</summary>
<br>

## Register

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
