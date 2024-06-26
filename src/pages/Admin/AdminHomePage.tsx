import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminSider from '../../components/Admin/AdminSider';
import { RxAvatar } from 'react-icons/rx';
import { useAppSelector } from '@/state/hooks';
import { useTranslation } from 'react-i18next';

const AdminHomePage = () => {
  const { t } = useTranslation(['adminHomePage']);
  const token = useAppSelector((state) => state.session.token);
  const currentRouteLocation = useLocation();
  const pageTitleMap = [
    { pathname: '/admin/profiles', title: t('profiles') },
    { pathname: '/admin/orderManagement', title: t('orderManagement') },
    { pathname: '/admin/reportManagement', title: t('reports') },
    { pathname: '/admin/settings', title: t('settings') },
    { pathname: '/admin/adminUserManagement', title: t('adminUserManagement') },
  ];
  const GetPageTitle = () => {
    const pageObject = pageTitleMap.find((page) => page.pathname === currentRouteLocation.pathname);

    return pageObject?.title ? pageObject.title : '';
  };
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  if (!token) {
    return <Navigate to="/login" state={{ from: { currentRouteLocation } }} replace />;
  }

  const location = useLocation();

  useEffect(() => {
    setSidebarVisible(false);
    //  console.log('Route changed to:', location.pathname);
    // You can perform any action here, such as sending analytics data, resetting state, etc.
  }, [location]);

  return (
    <div className={`wrapper ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
      <AdminSider />
      <div className="content-container col px-1 pt-4 px-sm-2 px-md-3 px-xl-5">
        <div className="burger-menu" onClick={toggleSidebar}>
          <span style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
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
