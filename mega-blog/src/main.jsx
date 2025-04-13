import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Signup, Error } from "../Pages";
import store from './store/store.js'
import {Provider} from 'react-redux'
import AuthLayout from "./components/AuthLayout.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
        
      },
      {
        path: "/login",
        element: (
        <AuthLayout authentication={false}>
        <Login />
        </AuthLayout>

        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
          <Signup/>
          </AuthLayout>
  
          )
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
    <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
