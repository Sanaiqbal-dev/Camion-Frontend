import React, { useEffect }  from 'react'
import {useAppSelector } from '@/state/hooks';
import { router } from './routes.tsx';
import { RouterProvider } from 'react-router-dom';
import { useLocale } from '@/i18n';


interface AppProps {
	doc: HTMLElement
}
const AppRoutes : React.FC<AppProps> = ({doc}) => {
	const {dir} = useAppSelector((state) => state.session);
	const {changeLanguage } = useLocale();
	useEffect(()=> {
		doc.dir = dir  === 'rtl' ? 'rtl' : 'ltr';
		document.documentElement.setAttribute('dir', dir);
		changeLanguage(dir === 'rtl' ? {code: 'ar',  dir: 'rtl'} : { code: 'en', dir: 'ltr'});
	}, [doc, dir, changeLanguage])	
return <RouterProvider router={router} />
};

export default AppRoutes;
