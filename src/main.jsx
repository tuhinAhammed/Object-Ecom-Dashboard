import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import DashboardPage from "./Page/DashboardPage.jsx";
import Dashboard from "./Page/Dashboard.jsx";
import Signin from "./Page/SignIn.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store/store.js";
import Order from "./Page/Order.jsx";
import Products from "./Page/Products.jsx";
import Categories from "./Page/Categories.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: "order",
            element: <Order />
          },
          {
            path: "products",
            element: <Products />
          },
          {
            path: "categories",
            element: <Categories />
          },
        ]
      },
      {
        path: "signin",
        element: <Signin />
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
