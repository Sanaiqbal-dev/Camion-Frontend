import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/custom-bootstrap.scss';
import './styles/bootstrap.rtl.min.css';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppRoutes from './routes/appRoutes.tsx';


const doc = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(doc!).render(
  <React.StrictMode>
    <Provider store={store}>
		<I18nextProvider i18n={i18n}>
      <AppRoutes doc={doc} />
		</I18nextProvider>
    </Provider>
  </React.StrictMode>,
);
