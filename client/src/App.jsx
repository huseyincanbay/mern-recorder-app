import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login'
import Register from './components/Register'
import Home from "./pages/Home"
import Companies from './pages/Companies'
import Products from './pages/Products'
import Navbar from "./components/Navbar"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path:"/products",
        element: <Products />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />, 
  },
]);

function App() {
  return(
    <div className = "bg-gray-100">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
