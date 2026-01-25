import "./index.css";
import { Navbar } from "./components/navbar/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomeProducts from "./components/product/HomeProducts";
import { SignUp } from "./components/auth/sign-up/SignUp";
import { Login } from "./components/auth/login/Login";
import Cart from "./components/cart/Cart";
import { useState } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function Layout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <Outlet context={{ addToCart, cartItems, removeFromCart }} />
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
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;