import { Outlet, Link, useLocation } from 'react-router-dom';
import ShipperSider from '../../components/Shipper/ShipperSider';
import { useAppSelector } from '@/state';
import { RxAvatar } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import CamionLogo from '../../assets/images/camion-logo.svg';
import useWindowWidth from '@/hooks/useWindowWidth';

const HomePage = () => {
  const { t } = useTranslation(['shipperHomePage']);
  const windowWidh = useWindowWidth();

  const profileImage = useAppSelector((state) => state.session?.profileImage);

  const currentPageTitle = useLocation();
  const pageTitleMap = [
    { pathname: '/shipper/shipperdashboard', title: t('dashboard') },
    { pathname: '/Shipper/shipperrequests', title: t('requests') },
    { pathname: '/shipper/shipperorders', title: t('orders') },
    { pathname: '/shipper/usermanagement', title: t('userManagement') },
    { pathname: '/shipper/proposals', title: t('proposals') },
    { pathname: '/shipper/shippertracking', title: t('tracking') },
  ];

  const GetPageTitle = () => {
    const pageObject = pageTitleMap.find((page) => page.pathname === currentPageTitle.pathname);
    return pageObject?.title ? pageObject.title : '';
  };

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const location = useLocation();
  useEffect(() => {
    setSidebarVisible(false);
  }, [location, t]);
  return (
    <div className={`wrapper ${isSidebarVisible ? 'sidebar-visible' : ''}`} style={{ backgroundColor: '#F3F3F3' }}>
      <ShipperSider />
      <div className="content-container col px-xs-0 px-sm-1 px-md-1 px-lg-1 pt-sm-4 pt-md-4 pt-lg-4 pt-xs-0 px-sm-2 px-md-3 px-xl-5">
        <div className="burger-menu" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-list" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
          </svg>
          <Image src={CamionLogo} />
          <div className="menu-group ml-3 d-flex flex-row-reverse justify-content-center align-items-center">
            <Link to="/shipper/usermanagement">
              <div style={{ height: '55px', width: '55px', borderRadius: '50%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {profileImage !== '' ? (
                  <img src={profileImage} style={{ height: '55px', width: '55px', borderRadius: '50%' }} />
                ) : (
                  <RxAvatar style={{ height: '100%', width: '100%' }} />
                )}
              </div>
            </Link>
          </div>
        </div>
        <header className="page-title bg-transparent d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: '700', color: '#535353' }}>{GetPageTitle()}</span>
          {windowWidh > 576 && (
            <div className="menu-group ml-3 d-flex flex-row-reverse justify-content-center align-items-center">
              <Link to="/shipper/usermanagement">
                <div style={{ height: '55px', width: '55px', borderRadius: '50%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {profileImage !== '' ? (
                    <img src={profileImage} style={{ height: '55px', width: '55px', borderRadius: '50%' }} />
                  ) : (
                    <RxAvatar style={{ height: '100%', width: '100%' }} />
                  )}
                </div>
              </Link>
            </div>
          )}
        </header>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
