import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Authentication/SignIn";
import { PrivateRoute } from "./pages/Authentication/PrivateRoute";
import Users from "./components/Users";
import UserEdit from "./components/Users/Edit";
import UserCreate from "./components/Users/Create";
import Categories from "./components/Categories";
import CategoryEdit from "./components/Categories/Edit";
import CategoryCreate from "./components/Categories/Create";
import BusinessDetail from "./components/Business";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return !loading ? (
    <>
      <Routes>
        <Route path={"/signIn"} element={<SignIn />} />
        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path={"/user/create"}
          element={
            <PrivateRoute>
              <UserCreate />
            </PrivateRoute>
          }
        />
        <Route
          path={"/user/edit/:id"}
          element={
            <PrivateRoute>
              <UserEdit />
            </PrivateRoute>
          }
        />
        <Route
          path={"/categories"}
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path={"/categories/create"}
          element={
            <PrivateRoute>
              <CategoryCreate />
            </PrivateRoute>
          }
        />
        <Route
          path={"/categories/edit/:id"}
          element={
            <PrivateRoute>
              <CategoryEdit />
            </PrivateRoute>
          }
        />
        <Route
          path={"/business-details"}
          element={
            <PrivateRoute>
              <BusinessDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  ) : (
    ""
  );
}

export default App;
