import React  from 'react'
import {useAppSelector } from '@/state/hooks';
import { router } from './routes.tsx';
import { RouterProvider } from 'react-router-dom';


interface AppProps {
	doc: HTMLElement
}
const AppRoutes : React.FC<AppProps> = ({doc}) => {
	const {dir} = useAppSelector((state) => state.session);
	doc.dir = dir  === 'rtl' ? 'rtl' : 'ltr';
return <RouterProvider router={router} />
};

export default AppRoutes;
