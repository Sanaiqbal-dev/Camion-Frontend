import { Accordion, Image } from 'react-bootstrap';
import CamionLogo from '../../assets/icons/ic-smallCamionlogo.svg';
import IconDashboard from '../../assets/icons/ic-dashboard.svg';
import IconOrderManagment from '../../assets/icons/ic-order-management.svg';
import IconRequest from '../../assets/icons/ic-request.svg';
import IconOrder from '../../assets/icons/ic-orders.svg';
import LogoutIcon from '../../assets/icons/ic-logoutIcon.svg';
import IconSettings from '../../assets/icons/ic-settings.svg';

import { NavLink } from 'react-router-dom';
import { setLogout } from '@/state/slice/sessionSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ActivateProfile from '../Modals/ActivateProfile';
import { useAppSelector } from '@/state';

const ShipperSider = () => {
  const dispatch = useDispatch();
  const session = useAppSelector((state) => state.session);

  const [showActivateProfile, setShowActivateProfile] = useState(false);

  const handleReplaceNavigate = () => {
    dispatch(setLogout());
  };

  return (
    <div className="text-light pt-5 sidebar  sidebar-admin" id="sidebar-container">
      <div>
        <Image src={CamionLogo} alt="logo" height={27} style={{ width: '80%', margin: '0 auto' }} />
        {session?.isCompanyAccount && (
          <Accordion defaultActiveKey="0" id="accordionExample">
            <NavLink key={'Dashboard'} to={'/shipper/shipperdashboard'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
              <Accordion.Item className="dashboard-item" eventKey="0">
                <Accordion.Header>
                  <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                    <Image src={IconDashboard} />
                    Dashboard
                  </div>
                </Accordion.Header>
              </Accordion.Item>
            </NavLink>
            <Accordion.Item className="order-management-item" eventKey="2">
              <Accordion.Header>
                <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                  <Image src={IconOrderManagment} />
                  Order Management
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <NavLink key={'Orders'} to={'/shipper/shipperorders'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconOrder} />
                        <span>Orders</span>
                      </div>
                    </h2>
                  </div>
                </NavLink>
                <NavLink key={'Requests'} to={'/Shipper/shipperrequests'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconRequest} />
                        <span>Requests</span>
                      </div>
                    </h2>
                  </div>
                </NavLink>
                <NavLink key={'Proposals'} to={'/shipper/proposals'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconRequest} />
                        <span>Proposals</span>
                      </div>
                    </h2>
                  </div>
                </NavLink>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>

      <div className="sidebar-admin">
        {session?.isCompanyAccount && (
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3" onClick={() => setShowActivateProfile(true)}>
            <Image src={IconSettings} />
            Settings
          </div>
        )}

        <NavLink key={'Logout'} to={'/login'} onClick={handleReplaceNavigate} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
            <Image src={LogoutIcon} />
            <span style={{ color: '#FF3939' }}>Logout</span>
          </div>
        </NavLink>
      </div>
      {showActivateProfile && (
        <ActivateProfile show={showActivateProfile} handleClose={() => setShowActivateProfile(false)} submitProfileInfo={() => setShowActivateProfile(false)} />
      )}
    </div>
  );
};

export default ShipperSider;
