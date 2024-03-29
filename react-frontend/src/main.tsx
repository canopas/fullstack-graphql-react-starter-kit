import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
  name: "React frontend",
  version: "1.0",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
