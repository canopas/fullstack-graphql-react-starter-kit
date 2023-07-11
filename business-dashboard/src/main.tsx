import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/css/index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import PageNotFound from "./components/Error/404";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
});

let name: string = window.location.pathname.split("/")[1];
localStorage.setItem("businessId", name);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    {name && name.length > 0 ? (
      <Router basename={"/" + name}>
        <App />
      </Router>
    ) : (
      <PageNotFound />
    )}
  </ApolloProvider>,
);
