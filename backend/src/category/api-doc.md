# API list

## 1. Get categories

<details>
<summary>Get all categories</summary>
<br>

## Get categories

- **Description** : This API is used to get categories.
- **Request type** : query
- **Request body sample**:

  - **Request body**

    ```
    query Categories($businessId: String!) {
        categories(businessId: $businessId) {
            id
            name
            parent_id
        }
    }
    ```

- **Response**:

```json
{
  "data": {
    "categories": [
      {
        "id": 1,
        "name": "category1",
        "parent_id": 0
      },
      {
        "id": 2,
        "name": "category2",
        "parent_id": 1
      }
    ]
  }
}
```

</details>

## 2. Get category by ID

<details>
<summary>Get category by given id</summary>
<br>

## Get category by ID

- **Description** : This API is used to get category by given id.
- **Request type** : query
- **Request body sample**:

  - **Request body**

    ```
    query Category($id: String!) {
        category(id: $id) {
            id
            name
            parent_id
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
    "category": {
      "id": 1,
      "name": "category1",
      "parent_id": 0
    }
  }
}
```

</details>

## 3. Create category

<details>
<summary>Create category</summary>
<br>

## Create category

- **Description** : This API is used to create category.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation CreateCategory($data: CategoryInput!) {
        createCategory(data: $data) {
            id
            name
            parent_id
        }
    }
    ```

  - **Add variables like below**

    ```
    {
    "data": {
            "name" : "name",
            "parent_id" : "id of parent category or 0",
            "business_id": "business id"
        },
    }
    ```

- **Response**:

```json
{
  "data": {
    "createCategory": {
      "id": 1,
      "name": "categoryName",
      "parent_id": 0
    }
  }
}
```

</details>

## 4. Update category

<details>
<summary>Update category</summary>
<br>

## Update category

- **Description** : This API is used to update category.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation UpdateCategory($id: String!, $data: CategoryInput!) {
        updateCategory(id: $id, data: $data) {
            id
            name
            parent_id
        }
    }
    ```

  - **Add variables like below**

    ```
    {
      "id": "1",
      "data": {
        "name": "newCategory",
      },
    }
    ```

- **Response**:

```json
{
  "data": {
    "updateCategory": {
      "id": 1,
      "name": "newCategory",
      "parent_id": 0
    }
  }
}
```

</details>

## 5. Delete category

<details>
<summary>Delete category</summary>
<br>

## Delete category

- **Description** : This API is used to delete category.
- **Request type** : mutation
- **Request body sample**:

  - **Request body**

    ```
    mutation DeleteCategory($id: Float!) {
        deleteCategory(id: $id)
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
    "deleteCategory": true
  }
}
```

</details>
