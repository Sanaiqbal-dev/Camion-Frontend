import { Button, ButtonGroup, Image } from 'react-bootstrap';
import CamionLogo from '../../assets/images/camion-logo.svg';
import IconUser from '../../assets/icons/ic-user.svg';
import IconOrderManagement from '../../assets/icons/ic-order-management.svg';
import IconReportManagement from '../../assets/icons/ic-report-management.svg';
import IconLogout from '../../assets/icons/ic-logout.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/state/slice/sessionSlice';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/i18n';
import { AVAILABLE_LANGUAGES } from '@/config/app'; // Make sure this import path is correct
import { ILanguage } from '@/interface/common';
import LanguageIcon from '../../assets/icons/ic-language.svg';

const AdminSider = () => {
  const { t } = useTranslation(['adminSider']);
  const dispatch = useDispatch();
  const { language, changeLanguage } = useLocale();

  const handleReplaceNavigate = () => {
    dispatch(setLogout());
  };
  const handleLanguageChange = (lang: ILanguage) => {
    changeLanguage(lang);
  };
  const getLanguageDisplayName = (langCode: string) => {
    if (langCode === 'ar') return 'ع';
    return langCode;
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
