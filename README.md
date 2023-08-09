<h1 align="center"><strong>Boilerplate Project with GraphQL, ReactJS, NodeJS, and MySQL</strong></h1>

This boilerplate project provides a solid foundation for developing web applications using GraphQL, ReactJS, NodeJS, and MySQL. With its intuitive architecture and powerful technologies, this project template empowers developers to quickly build scalable and efficient applications.

This includes essential configurations, common components, and best practices to help you kickstart your development process. Whether you're a beginner or an experienced developer, this project template is designed to accelerate your workflow and enable you to focus on building innovative features.

## Project structure

Project has 4 sub-projects to handle all the functionalities of the project.

- [Backend](https://github.com/canopas/omniDashboard/tree/main/backend) - Contains GraphQL APIs
- [React Admin](https://github.com/canopas/omniDashboard/tree/main/react-admin) - Admin panel to manage data
- [React Frontend](https://github.com/canopas/omniDashboard/tree/main/react-frontend) - Frontend to register the business
- [Business dashboard](https://github.com/canopas/omniDashboard/tree/main/business-dashboard) - Dashboard(Space) for individual business

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

## API documentation

- Find full API documentation [here](https://github.com/canopas/omniDashboard/blob/main/backend/README.md).

## Dependencies

- [typescript](https://www.typescriptlang.org/)

### Backend

- [graphql-js](https://github.com/graphql/graphql-js)
- [@apollo/server](https://www.apollographql.com/docs/apollo-server/)
- [express](https://expressjs.com/)
- [sequelize](https://sequelize.org/docs/v6/getting-started/)

### Frontend

- [react](https://react.dev/learn)
- [react-redux](https://react-redux.js.org/)
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
