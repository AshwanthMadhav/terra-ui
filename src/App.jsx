import { useState } from "react";
import "./styles/tailwind.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./containers/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Layout from "./components/Layout.jsx";
import Images from "./components/Images.jsx";
import { AuthContext } from "./contexts/AuthContexts";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "images",
        element: <Images />,
      },
    ],
  },
]);

function App() {
  const [auth, setAuth] = useState({ isLoggedIn: false, token: null });
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      <RouterProvider router={router} />;
    </AuthContext.Provider>
  );
}

export default App;
