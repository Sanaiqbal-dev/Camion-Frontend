// LanguageSwitcher.js
import { Button, ButtonGroup } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/i18n';
import { AVAILABLE_LANGUAGES } from '@/config/app';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLocale();
  const { t } = useTranslation('common');

  return (
		<>
		<ButtonGroup className="me-2" aria-label="First group" style={{ position: 'absolute', top: '35px', left: '50%', transform: 'translate(-50%, -50%)'}}>
		{AVAILABLE_LANGUAGES.length > 1 && AVAILABLE_LANGUAGES.map((lang) => (
				<Button variant={language === lang.code ?  'primary' : 'outline-primary'} onClick={() => changeLanguage(lang)}>{t(lang.code)}</Button>
			)
			)}
			</ButtonGroup>
    </>
  );
};

export default LanguageSwitcher;












/*


import { useTranslation } from "react-i18next";
import { setLanguage } from '@/state/slice/sessionSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';

const LanguageSwitcher = () => {
	const dispatch = useAppDispatch();
	const { i18n, t } = useTranslation('common');


	const selectedLanguage = useAppSelector((state) => state.session.lang);

  const handleLanguageChange = (language:string) => {
    dispatch(setLanguage({ code:  language, dir: language === 'en'? 'ltr' : 'rtl' }));	
    i18n.changeLanguage(language);
  };





	return <Button className="tw-ml-auto tw-mr-auto" variant="primary" type="button" onClick={()=>handleLanguageChange(selectedLanguage === 'en' ? 'ar' : 'en')}>
	{selectedLanguage == 'en' ? t('en') : t('ar')}
</Button>
};

export default LanguageSwitcher;
*/