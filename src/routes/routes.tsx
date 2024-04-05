import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Carrier/HomePage";
import Dashboard from "../components/Carrier/Dashboard";
import Tracking from "../components/Carrier/Tracking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/tracking",
        element: <Tracking />,
      },
      {
        path: "/requests",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Dashboard />,
      },
      {
        path: "/drivermanagement",
        element: <Dashboard />,
      },
      {
        path: "/vehiclemanagement",
        element: <Dashboard />,
      },
      {
        path: "/bayan",
        element: <Dashboard />,
      },
    ],
  },
]);