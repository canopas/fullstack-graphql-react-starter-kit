import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/css/index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import PageNotFound from "./components/Error/404";
import { store, persistor } from "./store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
  name: "Business dashboard",
  version: "1.0",
});

let businessId: string = window.location.pathname.split("/")[1];
localStorage.setItem("businessId", businessId);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        {businessId && businessId.length > 0 ? (
          <Router basename={"/" + businessId}>
            <App />
          </Router>
        ) : (
          <PageNotFound />
        )}
      </ApolloProvider>
    </PersistGate>
  </Provider>,
);
