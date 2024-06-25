import { useAppSelector } from '@/state';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }: { allowedRoles: [string] }) => {
  const session = useAppSelector((state) => state.session);
  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  if (session.user.role !== 'Admin') {
    if (!session?.isCompanyAccount && !location.pathname.includes('/profile')) {
      return <Navigate to={`/${session.user.role.toLowerCase()}/profile`} />;
    }
  }

  if (allowedRoles && !allowedRoles.includes(session?.user.role)) {
    if (session?.user.role === 'Carrier') {
      return <Navigate to="/carrier/dashboard" />;
    } else if (session?.user.role === 'Shipper') {
      return <Navigate to="/shipper/shipperdashboard" />;
    } else {
      return <Navigate to="/admin/Profiles" />;
    }
  }

  if (session?.isSubUser && location.pathname.includes(`${session?.user.role.toLowerCase()}/userManagement`)) {
    if (session?.user.role === 'Carrier') {
      return <Navigate to="/carrier/dashboard" />;
    } else {
      return <Navigate to="/shipper/shipperdashboard" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
