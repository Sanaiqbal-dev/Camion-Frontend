import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Shipper/HomePage";
import Dashboard from "../components/Shipper/Dashboard";
import Tracking from "../components/Shipper/Tracking";
import Requests from "../components/Shipper/Requests";
import Orders from "../components/Shipper/Orders";
import UserManagement from "../components/Shipper/UserManagement";
import Proposals from "../components/Shipper/Proposals";
import ProposalsSecond from "../components/Shipper/ProposalsSecond";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
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
        element: <Orders />,
      },
      {
        path: "/usermanagement",
        element: <UserManagement />,
      },
      {
        path: "/proposals",
        element: <Proposals />,
      },
      {
        path: "/proposalssecond",
        element: <ProposalsSecond />,
      },
      {
        path: "/bayan",
        element: <Dashboard />,
      },
    ],
  },
]);
