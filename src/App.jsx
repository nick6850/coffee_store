import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//components
import Layout from "./components/Layout/Layout";
import AuthRoute from "./components/AuthRoute/AuthRoute";

// Pages
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ShoppingBasket from "./pages/ShoppingBasket/ShoppingBasket";
import Checkout from "./pages/Checkout/Checkout";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }
      />

      <Route
        path="/:id"
        element={
          <AuthRoute>
            <ProductDetails />
          </AuthRoute>
        }
      />
      <Route
        path="basket"
        element={
          <AuthRoute>
            <ShoppingBasket />
          </AuthRoute>
        }
      />
      <Route
        path="checkout"
        element={
          <AuthRoute>
            <Checkout />
          </AuthRoute>
        }
      />

      <Route
        path="profile"
        element={
          <AuthRoute>
            <Profile />
          </AuthRoute>
        }
      />

      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
