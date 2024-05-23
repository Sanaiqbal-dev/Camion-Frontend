import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Carrier/Dashboard';
import Tracking from '../components/Carrier/Tracking';
import Requests from '../components/Carrier/Requests';
import { ReactElement, Suspense, lazy } from 'react';
import Orders from '../components/Carrier/Orders';
import DriverManagement from '../components/Carrier/DriverManagement';
import VehicleManagement from '../components/Carrier/VehicleManagement';
import Bayan from '../components/Carrier/Bayan';
import Profiles from '../components/Admin/Profiles';
import OrderManagement from '../components/Admin/OrderManagement';
import ReportManagement from '../components/Admin/ReportManagement';
import AdminUserManagement from '../components/Admin/AdminUserManagement';
import Settings from '../components/Admin/Settings';
import ShipperDashboard from '../components/Shipper/ShipperDashboard';
import ShipperOrders from '../components/Shipper/ShipperOrders';
import ShipperRequests from '../components/Shipper/ShipperRequests';
import Proposals from '../components/Shipper/Proposals';
import ProposalsSecond from '../components/Shipper/ProposalsSecond';
import ShipperTracking from '../components/Shipper/ShipperTracking';
import UserManagementShipper from '../components/Shipper/UserManagementShipper';
import UserManagement from '../components/Carrier/UserManagement';
import BayanBill from '../components/Carrier/BayanBill';
import PrivateRoute from './PrivateRoute';
import { Loading } from '@/components/Modals/Loading';

const LazyCarrierHome = lazy(() => import('../pages/Carrier/CarrierHomePage'));
const LazyAdminHome = lazy(() => import('../pages/Admin/AdminHomePage'));
const LazyShipperHome = lazy(() => import('../pages/Shipper/HomePage'));
const LazyLogin = lazy(() => import('../pages/Login'));
const LazyRegister = lazy(() => import('../pages/Register'));
const LazyCompanyVerification = lazy(() => import('../pages/CompanyVerification'));
const LazyForgotPassword = lazy(() => import('../pages/ForgetPassword'));

const withSuspense = (Component: ReactElement, fallback: ReactElement = <Loading size={100} />): ReactElement => <Suspense fallback={fallback}>{Component}</Suspense>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(<LazyLogin />),
  },
  {
    path: '/carrier',
    element: <PrivateRoute allowedRoles={['Carrier']}></PrivateRoute>,
    children: [
      {
        path: '*',
        element: withSuspense(<LazyCarrierHome />),
        children: [
          {
            index: true,
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'tracking',
            element: <Tracking />,
          },
          {
            path: 'requests',
            element: <Requests />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'drivermanagement',
            element: <DriverManagement />,
          },
          {
            path: 'vehiclemanagement',
            element: <VehicleManagement />,
          },
          {
            path: 'bayan',
            element: <Bayan />,
          },
          {
            path: 'userManagement',
            element: <UserManagement />,
          },
          {
            path: 'bayanBill',
            element: <BayanBill />,
          },
        ],
      },
    ],
  },
  {
    path: '/shipper',
    element: <PrivateRoute allowedRoles={['Shipper']}></PrivateRoute>,
    children: [
      {
        path: '*',
        element: withSuspense(<LazyShipperHome />),
        children: [
          {
            index: true,
            path: 'shipperdashboard',
            element: <ShipperDashboard />,
          },
          {
            path: 'shippertracking',
            element: <ShipperTracking />,
          },
          {
            path: 'shipperrequests',
            element: <ShipperRequests />,
          },
          {
            path: 'userManagement',
            element: <UserManagementShipper />,
          },
          {
            path: 'shipperorders',
            element: <ShipperOrders />,
          },
          {
            path: 'proposals',
            element: <Proposals />,
          },
          {
            path: 'proposalssecond',
            element: <ProposalsSecond />,
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <PrivateRoute allowedRoles={['Admin']} />,
    children: [
      {
        path: '*',
        element: withSuspense(<LazyAdminHome />),
        children: [
          {
            index: true,
            path: 'profiles',
            element: <Profiles />,
          },
          {
            path: 'orderManagement',
            element: <OrderManagement />,
          },
          {
            path: 'reportManagement',
            element: <ReportManagement />,
          },
          {
            path: 'adminUserManagement',
            element: <AdminUserManagement />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: withSuspense(<LazyLogin />, <Loading size={100} />),
  },
  {
    path: '/register',
    element: withSuspense(<LazyRegister />, <Loading size={100} />),
  },
  {
    path: '/companyVerification',
    element: withSuspense(<LazyCompanyVerification />, <Loading size={100} />),
  },
  {
    path: '/forgotPassword',
    element: withSuspense(<LazyForgotPassword />, <Loading size={100} />),
  },
]);
