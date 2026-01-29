import "./index.css";
import { Navbar } from "./components/navbar/Navbar";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
  useNavigate,
} from "react-router-dom";
import HomeProducts from "./components/product/HomeProducts";
import Cart from "./components/cart/Cart";
import { useState, useEffect } from "react";
import ProductDetail from "./components/product-detail/ProductDetail";
import { Checkout } from "./components/checkout/Checkout";
import Logout from "./components/logout/Logout";
import SignUp from "./components/[auth]/sign-up/SignUp";
import { Login } from "./components/[auth]/login/Login";
import NotFound from "./components/not-found/NotFound";

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
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser);
      }
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
    const userWithLogin = { ...userData, isLoggedIn: true };
    setUser(userWithLogin);
    localStorage.setItem("user", JSON.stringify(userWithLogin));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signup"); 
  };

  return (
    <>
      <Navbar cartItems={cartItems} user={user} onLogout={logout} />
      <Outlet
        context={{
          addToCart,
          cartItems,
          removeFromCart,
          clearCart,
          user,
          login,
          logout,
        }}
      />
    </>
  );
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AlreadyLoggedInRoute = ({ children }: { children: React.ReactNode }) => {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (user && user.isLoggedIn) {
    return <Navigate to="/" replace />;
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
        element: (
          <AlreadyLoggedInRoute>
            <SignUp />
          </AlreadyLoggedInRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AlreadyLoggedInRoute>
            <Login />
          </AlreadyLoggedInRoute>
        ),
      },
      {
        path: "logout",
        element: (
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:id",
        element: (
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;