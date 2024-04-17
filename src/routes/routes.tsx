import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Carrier/HomePage";
import Dashboard from "../components/Carrier/Dashboard";
import Tracking from "../components/Carrier/Tracking";
import Requests from "../components/Carrier/Requests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index:true,
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/tracking",
        element: <Tracking />,
      },
      {
        path: "/requests",
        element: <Requests />,
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