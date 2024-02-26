import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";

// Pages
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ShoppingBasket from "./pages/ShoppingBasket/ShoppingBasket";
import Checkout from "./pages/Checkout/Checkout";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/:id" element={<ProductDetails />} />
      <Route path="basket" element={<ShoppingBasket />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="profile" element={<Profile />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
