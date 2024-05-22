import { Outlet, useLocation, Link } from 'react-router-dom';
import ProfileIcon from '../../assets/icons/ic-profile.svg';
import NotificationIcon from '../../assets/icons/ic-notification.svg';
import MenuIcon from '../../assets/icons/ic-menu.svg';
import { Image } from 'react-bootstrap';
import ShipperSider from '../../components/Shipper/ShipperSider';
import ActivateProfile from '../../components/Modals/ActivateProfile';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const currentPageTitle = useLocation();
  const pageTitleMap = [
    { pathname: '/shipper/shipperdashboard', title: 'Dashboard' },
    { pathname: '/shipper/shipperrequests', title: 'Requests' },
    { pathname: '/shipper/shipperorders', title: 'Orders' },
    { pathname: '/shipper/userManagement', title: 'User Management' },
    { pathname: '/shipper/proposals', title: 'Proposals' },
    { pathname: '/shipper/proposalssecond', title: 'Proposals' },
    { pathname: '/shipper/shippertracking', title: 'Tracking' },
  ];

  const GetPageTitle = () => {
    const pageObject = pageTitleMap.find((page) => page.pathname === currentPageTitle.pathname);

    return pageObject?.title ? pageObject.title : '';
  };

  const toggleSidebar = () => {};
  const showCreateCompanyNotification = useSelector((state: any) => !state.session.isCompanyAccount) && currentPageTitle.pathname === '/shipper/shipperdashboard';

  return (
    <div className="wrapper" style={{ backgroundColor: '#F3F3F3' }}>
      <ShipperSider />
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
            <Link to="/shipper/usermanagement">
              <Image className="profile-img" src={ProfileIcon} />
            </Link>
            <Image className="notification-icon" src={NotificationIcon} alt="Notifications" width="22" height="22" />
            <Image className="menu-icon" src={MenuIcon} alt="Menu" width="22" height="22" />
            {showCreateCompanyNotification && (
              <div
                style={{
                  fontFamily: 'Roboto',
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
          </div>
        </header>
        <ActivateProfile show={showProfileModal} handleClose={() => setShowProfileModal(false)} submitProfileInfo={() => setShowProfileModal(false)} />
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
