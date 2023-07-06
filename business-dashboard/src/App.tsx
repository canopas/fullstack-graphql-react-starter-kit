import { Route, Routes } from "react-router-dom";
import BaseIndex from "./components/Base";
import PageNotFound from "./components/Error/404";

function App() {
  var name: string = window.location.pathname.slice(1);
  localStorage.setItem("businessId", name);

  return name && name.length > 0 ? (
    <Routes>
      <Route path={"/" + name} element={<BaseIndex />} />
    </Routes>
  ) : (
    <PageNotFound />
  );
}

export default App;
