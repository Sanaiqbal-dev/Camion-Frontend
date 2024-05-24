import { useAppSelector } from '@/state';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }: { allowedRoles: [string] }) => {
  const { user } = useAppSelector((state) => state.session);
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (!user.isCompanyAccount) {
  //   return <Navigate to="/" />;
  // }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'Carrier') {
      return <Navigate to="/carrier/dashboard" />;
    } else if (user.role === 'Shipper') {
      return <Navigate to="/shipper/shipperdashboard" />;
    } else {
      return <Navigate to="/admin/Profiles" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
