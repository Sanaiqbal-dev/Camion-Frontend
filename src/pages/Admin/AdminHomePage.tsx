import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminSider from '../../components/Admin/AdminSider';
import { RxAvatar } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const AdminHomePage = () => {
  const token = useSelector((state: any) => state.session.token);
  const currentRouteLocation = useLocation();
  const pageTitleMap = [
    { pathname: '/admin/profiles', title: 'Profiles' },
    { pathname: '/admin/orderManagement', title: 'Order Managment' },
    { pathname: '/admin/reportManagement', title: 'Reports' },
    { pathname: '/admin/settings', title: 'Settings' },
    { pathname: '/admin/adminUserManagement', title: 'Admin User Management' },
  ];
  const GetPageTitle = () => {
    const pageObject = pageTitleMap.find((page) => page.pathname === currentRouteLocation.pathname);

    return pageObject?.title ? pageObject.title : '';
  };
  const toggleSidebar = () => {};

  if (!token) {
    return <Navigate to="/login" state={{ from: { currentRouteLocation } }} replace />;
  }

  return (
    <div className="wrapper">
      <AdminSider />
      <div className="content-container col px-1 pt-4 px-sm-2 px-md-3 px-xl-5">
        <div className="burger-menu">
          <span onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </span>
        </div>
        <header className="page-title bg-transparent d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: '700', color: '#535353' }}>{GetPageTitle()}</span>

          <div className="menu-group ml-3 d-flex flex-row-reverse justify-content-center align-items-center">
            <Link to={'/admin/adminUserManagement'}>
              <RxAvatar style={{ height: '100%', width: '100%', color: 'black' }} />
            </Link>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHomePage;
