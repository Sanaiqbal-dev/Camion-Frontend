import { Image } from 'react-bootstrap';
import CamionLogo from '../../assets/images/camion-logo.svg';
import IconUser from '../../assets/icons/ic-user.svg';
import IconOrderManagement from '../../assets/icons/ic-order-management.svg';
import IconReportManagement from '../../assets/icons/ic-report-management.svg';
import IconLogout from '../../assets/icons/ic-logout.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/state/slice/sessionSlice';
import { useTranslation } from 'react-i18next';

const AdminSider = () => {
  const { t } = useTranslation(['adminSider']);
  const dispatch = useDispatch();

  const handleReplaceNavigate = () => {
    dispatch(setLogout());
  };

  return (
    <div className="text-light pt-5 sidebar sidebar-admin" id="sidebar-container">
      <div>
        <Image src={CamionLogo} alt="logo" height={27} style={{ width: '80%', margin: '0 auto' }} />
        <div className="accordion">
          <NavLink key={'User Profiles'} to={'/admin/profiles'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
            <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
              <Image src={IconUser} />
              {t('userProfiles')}
            </div>
          </NavLink>
          <NavLink key={'Order Management'} to={'/admin/orderManagement'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
            <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
              <Image src={IconOrderManagement} />
              {t('orderManagement')}
            </div>
          </NavLink>
          <NavLink key={'Report Management'} to={'/admin/reportManagement'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
            <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
              <Image src={IconReportManagement} />
              {t('reportManagement')}
            </div>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-admin">
        <NavLink key={'Logout'} to={'/login'} onClick={handleReplaceNavigate} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
          <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
            <Image src={IconLogout} />
            <span style={{ color: '#FF3939' }}>{t('logout')}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSider;
