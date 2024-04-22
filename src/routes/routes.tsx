import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Carrier/Dashboard";
import Tracking from "../components/Carrier/Tracking";
import Requests from "../components/Carrier/Requests";
import { ReactElement, Suspense, lazy } from "react";

const LazyHome = lazy(() => import("../pages/Carrier/HomePage"));
const LazyLogin = lazy(() => import("../pages/Login"));
const LazyRegister = lazy(() => import("../pages/Register"));

const withSuspense = (
  Component: ReactElement,
  fallback: ReactElement = <div>Loading...</div>
): ReactElement => <Suspense fallback={fallback}>{Component}</Suspense>;

export const router = createBrowserRouter([
  {
    path:"/",
    element: withSuspense(<LazyHome />),
  },
  {
    path: "/carrier",
    element: withSuspense(<LazyHome />),
    children: [
      {
        index: true,
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tracking",
        element: <Tracking />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "orders",
        element: <Requests />,
      },
      {
        path: "drivermanagement",
        element: <Requests />,
      },
      {
        path: "vehiclemanagement",
        element: <Requests />,
      },
      {
        path: "bayan",
        element: <Requests />,
      },
    ],
  },
  {
    path: "/shipper",
    element: withSuspense(<LazyHome />),
    children: [
      {
        index: true,
        path: "dashboard",
      },
      {
        path: "tracking",
      },
      {
        path: "requests",
      },
      {
        path: "orders",
      },
      {
        path: "proposals",
      },
    ],
  },
  {
    path: "/admin",
    element: withSuspense(<LazyHome />),
    children: [
      {
        index: true,
        path: "profiles",
      },
      {
        path: "orderManagement",
      },
      {
        path: "reports",
      },
      {
        path: "adminUserManagement",
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(<LazyLogin />, <div>Loading Login...</div>),
  },
  {
    path: "/register",
    element: withSuspense(<LazyRegister />, <div>Loading Register...</div>),
  },
]);
