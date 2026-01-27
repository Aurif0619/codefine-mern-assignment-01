import "./index.css";
import { Navbar } from "./components/navbar/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomeProducts from "./components/product/HomeProducts";
import Cart from "./components/cart/Cart";
import { useState } from "react";
import ProductDetail from "./components/product-detail/ProductDetail";
import { Checkout } from "./components/checkout/Checkout";
import SignUp from "./components/sign-up/SignUp";
import { Login } from "./components/login/Login";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function Layout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar cartItems={cartItems} />
      <Outlet context={{ addToCart, cartItems, removeFromCart, clearCart }} />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeProducts />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
