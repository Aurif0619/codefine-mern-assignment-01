import "./index.css";
import { Navbar } from "./components/navbar/Navbar";
import { createBrowserRouter,
  Outlet, RouterProvider, Navigate} from "react-router-dom";
import HomeProducts from "./components/product/HomeProducts";
import Cart from "./components/cart/Cart";
import { useState, useEffect } from "react";
import ProductDetail from "./components/product-detail/ProductDetail";
import { Checkout } from "./components/checkout/Checkout";
import { Login } from "./components/login/Login";
import SignUp from "./components/sign-up/SignUp";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  token: string;
};

function Layout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <Navbar cartItems={cartItems} user={user} onLogout={logout} />
      <Outlet
        context={{ addToCart,
          cartItems, removeFromCart,
          clearCart, user,
          login, logout,
        }}
      />
    </>
  );
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomeProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
