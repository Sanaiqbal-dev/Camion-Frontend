import { Accordion, Button, ButtonGroup, Image } from 'react-bootstrap';
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
import { useTranslation } from 'react-i18next';
import LanguageIcon from '../../assets/icons/ic-language.svg';

import { useLocale } from '@/i18n';
import { AVAILABLE_LANGUAGES } from '@/config/app'; // Make sure this import path is correct
import { ILanguage } from '@/interface/common';

const ShipperSider = () => {
  const { t } = useTranslation(['shipperSider']);
  const { language, changeLanguage } = useLocale();

  const dispatch = useDispatch();
  const session = useAppSelector((state) => state.session);
  const handleLanguageChange = (lang: ILanguage) => {
    changeLanguage(lang);
  };

  const getLanguageDisplayName = (langCode: string) => {
    if (langCode === 'ar') return 'ع';
    return langCode;
  };

  const [showActivateProfile, setShowActivateProfile] = useState(false);

  const handleReplaceNavigate = () => {
    dispatch(setLogout());
  };

  return (
    <div className="text-light pt-5 sidebar sidebar-admin" id="sidebar-container">
      <div>
        <Image src={CamionLogo} alt="logo" height={27} style={{ width: '80%', margin: '0 auto' }} />
        {session?.isCompanyAccount && !session.isSubUser && (
          <Accordion defaultActiveKey="0" id="accordionExample">
            <NavLink key={'Dashboard'} to={'/shipper/shipperdashboard'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
              <Accordion.Item className="dashboard-item" eventKey="0">
                <Accordion.Header>
                  <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                    <Image src={IconDashboard} />
                    {t('dashboard')}
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
                <NavLink key={'Orders'} to={'/shipper/shipperorders'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconOrder} />
                        {t('orders')}
                      </div>
                    </h2>
                  </div>
                </NavLink>
                <NavLink key={'Requests'} to={'/Shipper/shipperrequests'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconRequest} />
                        {t('requests')}
                      </div>
                    </h2>
                  </div>
                </NavLink>
                <NavLink key={'Proposals'} to={'/shipper/proposals'} className={({ isActive }) => (isActive ? 'selected-navlink' : undefined)}>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <div className="accordion-not-collapsing-item" style={{ gap: '12px' }}>
                        <Image src={IconRequest} />
                        {t('proposals')}
                      </div>
                    </h2>
                  </div>
                </NavLink>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>

      <div>
        <div className="accordion-not-collapsing-item tw-flex tw-gap-3">
          <img src={LanguageIcon} style={{ height: '35px', width: '35px', marginLeft: '-5px', borderRadius: '50%' }} />
          <ButtonGroup>
            {AVAILABLE_LANGUAGES.length > 1 &&
              AVAILABLE_LANGUAGES.map((lang: ILanguage) => (
                <Button key={lang.code} variant={language === lang.code ? 'primary' : 'outline-primary'} onClick={() => handleLanguageChange(lang)}>
                  {getLanguageDisplayName(lang.code)}
                </Button>
              ))}
          </ButtonGroup>
        </div>
        {session?.isCompanyAccount && (
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

export default ShipperSider;
