import './index.css'; 
import { Navbar } from './components/navbar/Navbar';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import HomeProducts from './components/product/HomeProducts';
import { SignUp } from './components/auth/sign-up/SignUp';
import { Login } from './components/auth/login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",  
        element:  <HomeProducts />
      },
      {
        path: "/",
        element: <SignUp/>
      },
      {
        path: "/",
        element: <Login/>
      }
      
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;