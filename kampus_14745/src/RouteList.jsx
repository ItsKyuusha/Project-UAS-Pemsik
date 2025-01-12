import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ScreenLayout from "./layouts/ScreenLayout";
import Dashboard from "./pages/screens/dashboard";
import Evacuations from "./pages/screens/evacuations";
import Reports from "./pages/screens/reports";
import ProtectedRoute from "./Components/ProtectedRoute";

const RouteList = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/screens',
    element:
      <ProtectedRoute>
        <ScreenLayout />
      </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'evacuations',
        element: <Evacuations />,
      },
      {
        path: 'reports',
        element: <Reports />
      },
    ]
  }
]);

export default RouteList;
