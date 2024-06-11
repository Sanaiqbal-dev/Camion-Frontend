import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import CarrierSider from '../../components/Carrier/CarrierSider';
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import ActivateProfile from '@/components/Modals/ActivateProfile';
import { useState } from 'react';
import { useAppSelector } from '@/state';
import { RxAvatar } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';

const CarrierHomePage = () => {
  const { t } = useTranslation(['carrierHomePage']);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const token = useAppSelector((state) => state.session.token);
  const currentRouteLocation = useLocation();
  const profileImage = useAppSelector((state) => state.session?.profileImage);
  const pageTitleMap = [
    { pathname: '/carrier/dashboard', title: t('dashboard') },
    { pathname: '/carrier/tracking', title: t('tracking') },
    { pathname: '/carrier/requests', title: t('requests') },
    { pathname: '/carrier/orders', title: t('orders') },
    { pathname: '/carrier/drivermanagement', title: t('driverManagement') },
    { pathname: '/carrier/vehiclemanagement', title: t('vehicleManagement') },
    { pathname: '/carrier/bayan', title: t('bayan') },
    { pathname: '/carrier/userManagement', title: t('userManagement') },
    { pathname: '/carrier/bayanBill', title: t('bayanBill') },
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

  return (
    <div className={`wrapper ${isSidebarVisible ? 'sidebar-visible' : ''}`} style={{ backgroundColor: '#F3F3F3' }}>
      <CarrierSider />
      <div className="content-container col px-1 pt-4 px-sm-2 px-md-3 px-xl-5">
        <div className="burger-menu" onClick={toggleSidebar}>
          <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </span>
        </div>
        <header className="page-title bg-transparent d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: '700', color: '#535353' }}>{GetPageTitle()}</span>
          <div className="menu-group ml-3 d-flex flex-row-reverse justify-content-center align-items-center">
            <Link to="/carrier/userManagement">
              <div style={{ height: '55px', width: '55px', borderRadius: '50%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {profileImage !== '' ? (
                  <img src={profileImage} alt={t('profileImageAlt')} style={{ height: '55px', width: '55px', borderRadius: '50%' }} />
                ) : (
                  <RxAvatar style={{ height: '100%', width: '100%' }} />
                )}
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuItem onClick={() => onLogoutClick()}>
                  <Button variant="primary">Logout</Button>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ActivateProfile show={showProfileModal} handleClose={() => setShowProfileModal(false)} submitProfileInfo={() => setShowProfileModal(false)} />
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default CarrierHomePage;
