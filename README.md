# omniDashboard

This is type of business management project built with GraphQL and React.js.

It can be considered as boilerplate web application contains GraphQL, Typescript, React.js, Apollo, ExpressJS and Mysql database.

## Project structure

Project has 4 sub-projects to handle all the functionalities of the project.

- Backend - Contains GraphQL APIs
- React Admin - Admin panel to manage data
- React Frontend - Frontend to register the business
- Business dashboard - Dashboard(Space) for individual business

## Requirements

- Node v20.3.1
- Typescript

## Install dependencies

- Install dependencies

  ```
  yarn install
  ```

- Add new dependency

  ```
  yarn add <dependency name>
  ```

## Run the server

### Node Backend

- Start Node Server

  ```
  yarn start
  ```

- Run test

  ```
  yarn test
  ```

  You should find GraphQL API running at `http://localhost:4000/graphql`.

### React Frontend, React admin and Business dashboard

- go to the choosen directory using below command,

  ```
  cd <directory-name>
  ```

- Build project

  ```
  yarn build
  ```

- Start development Server

  ```
  yarn dev
  ```

  Server will start at `http://localhost:<port>`.

## To enable pre-commit hook

```
git config core.hooksPath .githooks
```

## Dependencies

- [typescript](https://www.typescriptlang.org/)

### Backend

- [graphql-js](https://github.com/graphql/graphql-js)
- [@apollo/server](https://www.apollographql.com/docs/apollo-server/)
- [express](https://expressjs.com/)
- [sequelize](https://sequelize.org/docs/v6/getting-started/)

### Frontend

- [react](https://react.dev/learn)
- [@headlessui/react](https://headlessui.com/)
- [@apollo/client](https://www.apollographql.com/docs/react/)
- [graphql-js](https://github.com/graphql/graphql-js)
- [vite](https://vitejs.dev/guide/)
- [tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)
- [font-awesome](https://fontawesome.com/v5/docs/web/use-with/react)

### Test

- [jest](https://github.com/jestjs/jest)

## LICENSE

Omnidashboard is released under the [MIT](https://github.com/canopas/omnidashboard/blob/main/LICENSE.md).
