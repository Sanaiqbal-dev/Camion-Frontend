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

import LogoutIcon from '../../assets/icons/ic-logoutIcon.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/state/slice/sessionSlice';

const CarrierSider = () => {
  const dispatch = useDispatch();

  const handleReplaceNavigate = () => {
    dispatch(setLogout());
  };
  return (
    <div className="text-light pt-5 sidebar  sidebar-admin" id="sidebar-container">
      <div>
        <Image src={CamionLogo} alt="logo" height={27} style={{ width: '80%', margin: '0 auto' }} />
        <Accordion defaultActiveKey="0" id="accordionExample">
          <NavLink key={'Dashboard'} to={'/carrier/dashboard'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
            <Accordion.Item className="dashboard-item" eventKey="0">
              <Accordion.Header>
                <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                  <Image src={IconDashboard} />
                  Dashboard
                </div>
              </Accordion.Header>
            </Accordion.Item>
          </NavLink>
          <NavLink key={'Tracking'} to={'/carrier/tracking'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
            <Accordion.Item className="tracking-item" eventKey="1">
              <Accordion.Header>
                <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                  <Image src={IconTracking} />
                  <span>Tracking</span>
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
              <NavLink key={'Requests'} to={'/carrier/requests'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                      <Image src={IconRequest} />
                      <span>Requests</span>
                    </div>
                  </h2>
                </div>
              </NavLink>
              <NavLink key={'Orders'} to={'/carrier/orders'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                      <Image src={IconOrder} />
                      <span>Orders</span>
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
                Fleet Management
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <NavLink key={'Driver Management'} to={'/carrier/drivermanagement'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                      <Image src={IconDriverManagment} />
                      <span>Driver Managment</span>
                    </div>
                  </h2>
                </div>
              </NavLink>
              <NavLink key={'Vehicle Management'} to={'/carrier/vehiclemanagement'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                      <Image src={IconVehicleManagment} />
                      <span>Vehicle Management</span>
                    </div>
                  </h2>
                </div>
              </NavLink>
              <NavLink key={'Bayan'} to={'/carrier/bayan'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                      <Image src={IconBayan} />
                      <span>Bayan</span>
                    </div>
                  </h2>
                </div>
              </NavLink>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="sidebar-admin">
        <NavLink key={'Logout'} to={'/login'} onClick={handleReplaceNavigate} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
            <Image src={LogoutIcon} />
            <span style={{ color: '#FF3939' }}>Logout</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default CarrierSider;
