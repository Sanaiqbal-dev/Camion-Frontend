import { Accordion, Image } from 'react-bootstrap';
import CamionLogo from '../../assets/images/camion-logo.svg';
import IconDashboard from '../../assets/icons/ic-dashboard.svg';
import IconTracking from '../../assets/icons/ic-tracking.svg';
import IconOrderManagment from '../../assets/icons/ic-order-management.svg';
import IconRequest from '../../assets/icons/ic-request.svg';
import IconOrder from '../../assets/icons/ic-orders.svg';
import IconFleetManagment from '../../assets/icons/ic-fleet.svg';
import IconDriverManagment from '../../assets/icons/ic-driver-management.svg';
import IconVehicleManagment from '../../assets/icons/ic-vehicle-management.svg';
import IconBayan from '../../assets/icons/ic-bayan.svg';
import IconSettings from '../../assets/icons/ic-settings.svg';

import LogoutIcon from '../../assets/icons/ic-logoutIcon.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/state/slice/sessionSlice';
import ActivateProfile from '../Modals/ActivateProfile';
import { useState } from 'react';
import { useAppSelector } from '@/state';
import { useTranslation } from 'react-i18next';

const CarrierSider = () => {
  const [showActivateProfile, setShowActivateProfile] = useState(false);
  const session = useAppSelector((state) => state.session);
  const { t } = useTranslation(['carrierSider']);

  const dispatch = useDispatch();

  const handleReplaceNavigate = () => {
    dispatch(setLogout());
  };

  return (
    <div className="text-light pt-5 sidebar sidebar-admin" id="sidebar-container">
      <div>
        <Image src={CamionLogo} alt="logo" height={27} style={{ width: '80%', margin: '0 auto' }} />
        {session?.isCompanyAccount && (
          <Accordion defaultActiveKey="0" id="accordionExample">
            <NavLink key={'Dashboard'} to={'/carrier/dashboard'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
              <Accordion.Item className="dashboard-item" eventKey="0">
                <Accordion.Header>
                  <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                    <Image src={IconDashboard} />
                    {t('dashboard')}
                  </div>
                </Accordion.Header>
              </Accordion.Item>
            </NavLink>
            <NavLink key={'Tracking'} to={'/carrier/tracking'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
              <Accordion.Item className="tracking-item" eventKey="1">
                <Accordion.Header>
                  <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                    <Image src={IconTracking} />
                    <span>{t('tracking')}</span>
                  </div>
                </Accordion.Header>
              </Accordion.Item>
            </NavLink>
            <Accordion.Item className="order-management-item" eventKey="2">
              <Accordion.Header>
                <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                  <Image src={IconOrderManagment} />
                  {t('orderManagement')}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <NavLink key={'Requests'} to={'/carrier/requests'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconRequest} />
                        <span>{t('requests')}</span>
                      </div>
                    </h2>
                  </div>
                </NavLink>
                <NavLink key={'Orders'} to={'/carrier/orders'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconOrder} />
                        <span>{t('orders')}</span>
                      </div>
                    </h2>
                  </div>
                </NavLink>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="fleet-management-item" eventKey="3">
              <Accordion.Header>
                <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                  <Image src={IconFleetManagment} />
                  {t('fleetManagement')}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <NavLink key={'Driver Management'} to={'/carrier/drivermanagement'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconDriverManagment} />
                        <span>{t('driverManagement')}</span>
                      </div>
                    </h2>
                  </div>
                </NavLink>
                <NavLink key={'Vehicle Management'} to={'/carrier/vehiclemanagement'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconVehicleManagment} />
                        <span>{t('vehicleManagement')}</span>
                      </div>
                    </h2>
                  </div>
                </NavLink>
                <NavLink key={'Bayan'} to={'/carrier/bayan'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconBayan} />
                        <span>{t('bayan')}</span>
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
        {session.isCompanyAccount && !session.isSubUser && (
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3" onClick={() => setShowActivateProfile(true)}>
            <Image src={IconSettings} />
            {t('settings')}
          </div>
        )}
        <NavLink key={'Logout'} to={'/login'} onClick={handleReplaceNavigate} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
            <Image src={LogoutIcon} />
            <span style={{ color: '#FF3939' }}>{t('logout')}</span>
          </div>
        </NavLink>
      </div>
      {showActivateProfile && (
        <ActivateProfile show={showActivateProfile} handleClose={() => setShowActivateProfile(false)} submitProfileInfo={() => setShowActivateProfile(false)} />
      )}
    </div>
  );
};

export default CarrierSider;
