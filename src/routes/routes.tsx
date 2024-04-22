import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Carrier/Dashboard";
import Tracking from "../components/Carrier/Tracking";
import Requests from "../components/Carrier/Requests";
import { Suspense, lazy } from "react";

const LazyHome = lazy(() => import("../pages/Carrier/HomePage"));
const LazyLogin = lazy(() => import("../pages/Login"));
const LazyRegister = lazy(() => import("../pages/Register"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <LazyHome />
      </Suspense>
    ),
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
        element: <Requests />,
      },
      {
        path: "/drivermanagement",
        element: <Requests />,
      },
      {
        path: "/vehiclemanagement",
        element: <Requests />,
      },
      {
        path: "/bayan",
        element: <Requests />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense>
        <LazyHome />
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: "/dashboard",
      },
      {
        path: "/tracking",
      },
      {
        path: "/requests",
      },
      {
        path: "/orders",
      },
      {
        path: "/proposals",
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense>
        <LazyHome />
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: "/profiles",
        // element: <Dashboard />,
      },
      {
        path: "/orderManagement",
      },
      {
        path: "/reports",
      },
      {
        path: "/adminUserManagement",
      }
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading Login...</div>}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading Register...</div>}>
        <LazyRegister />
      </Suspense>
    ),
  },
]);
