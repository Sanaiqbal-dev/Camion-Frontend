import { Outlet, Link, useLocation } from 'react-router-dom';
import ShipperSider from '../../components/Shipper/ShipperSider';
import { useAppSelector } from '@/state';
import { RxAvatar } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation(['shipperHomePage']);
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

  const toggleSidebar = () => {};

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
              <div style={{ height: '55px', width: '55px', borderRadius: '50%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {profileImage !== '' ? (
                  <img src={profileImage} style={{ height: '55px', width: '55px', borderRadius: '50%' }} />
                ) : (
                  <RxAvatar style={{ height: '100%', width: '100%' }} />
                )}
              </div>
            </Link>
          </div>
        </header>

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
