import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Signup, Error } from "../Pages";
import store from './store/store.js'
import {Provider} from 'react-redux'

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
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
