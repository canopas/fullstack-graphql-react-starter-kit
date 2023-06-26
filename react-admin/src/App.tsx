import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import { PrivateRoute } from "./pages/Authentication/PrivateRoute";
import Users from "./components/Users/Index";
import UserEdit from "./components/Users/Edit";

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

  return loading ? (
    <p className=" text-center text-danger">Failed to load app</p>
  ) : (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/edit/:id"
          element={
            <PrivateRoute>
              <UserEdit />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
