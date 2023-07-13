# API list

## 1. Get business types

<details>
<summary>Get all business types</summary>
<br>

## Get users

- **Description** : This API is used to get all business type.
- **Request type** : query
- **Request body sample**:

  - **Request body**

    ```
    query businessTypes() {
      businessTypes {
        id
        type
      }
    }
    ```

- **Response**:

```json
{
  "data": {
    "businessTypes": [
      {
        "id": 1,
        "type": "Type1"
      },
      {
        "id": 2,
        "type": "Type2"
      }
    ]
  }
}
```

</details>
