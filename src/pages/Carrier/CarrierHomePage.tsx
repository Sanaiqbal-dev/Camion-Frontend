import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import CarrierSider from '../../components/Carrier/CarrierSider';
import ProfileIcon from '../../assets/icons/ic-profile.svg';
import NotificationIcon from '../../assets/icons/ic-notification.svg';
import MenuIcon from '../../assets/icons/ic-menu.svg';
import { Button, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import ActivateProfile from '@/components/Modals/ActivateProfile';
import { useState } from 'react';
const CarrierHomePage = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const token = useSelector((state: any) => state.session.token);
  const hasNoCompanyRegistered = useSelector((state: any) => !state.session.isCompanyAccount);
  const currentRouteLocation = useLocation();

  const pageTitleMap = [
    { pathname: '/carrier/dashboard', title: 'Dashboard' },
    { pathname: '/carrier/tracking', title: 'Tracking' },
    { pathname: '/carrier/requests', title: 'Requests' },
    { pathname: '/carrier/orders', title: 'Orders' },
    { pathname: '/carrier/drivermanagement', title: 'Driver Management' },
    { pathname: '/carrier/vehiclemanagement', title: 'Vehicle Management' },
    { pathname: '/carrier/bayan', title: 'Bayan' },
    { pathname: '/carrier/userManagement', title: 'User Management' },
    { pathname: '/carrier/bayanBill', title: 'Bayan Bill' },
  ];
  const GetPageTitle = () => {
    const pageObject = pageTitleMap.find((page) => page.pathname === currentRouteLocation.pathname);

    return pageObject?.title ? pageObject.title : '';
  };
  const toggleSidebar = () => {};

  if (!token) {
    return <Navigate to="/login" state={{ from: { currentRouteLocation } }} replace />;
  }
  const showCreateCompanyNotification = hasNoCompanyRegistered && currentRouteLocation.pathname === '/carrier/dashboard';
  return (
    <div className="wrapper">
      <CarrierSider />
      <div className="content-container col px-1 pt-4 px-sm-2 px-md-3 px-xl-5">
        <div className="burger-menu">
          <span onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
            </svg>
          </span>
        </div>
        <header className="page-title bg-transparent d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: '700', color: '#535353' }}>{GetPageTitle()}</span>

          <div className="menu-group ml-3 d-flex flex-row-reverse justify-content-center align-items-center">
            <Link to={'/carrier/userManagement'}>
              <Image className="profile-img" src={ProfileIcon} />
            </Link>
            <Image className="notification-icon" src={NotificationIcon} alt="Notifications" width="22" height="22" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Image className="menu-icon" src={MenuIcon} alt="Menu" width="22" height="22" />
                </Button>
              </DropdownMenuTrigger>

              {showCreateCompanyNotification && (
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: '400',
                    textAlign: 'left',
                    color: '#000000',
                    backgroundColor: '#F9090973',
                    borderRadius: '45px',
                    padding: '4px',
                  }}>
                  To activate your profile please complete your profile details,{' '}
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowProfileModal(true)}>
                    Click Here
                  </span>
                </div>
              )}

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
