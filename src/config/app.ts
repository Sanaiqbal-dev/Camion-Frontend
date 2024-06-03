import { ILanguage } from '../interface/common';

const appConfig = {
  BASE_URL: 'https://camionapi.azurewebsites.net',
  // BASE_URL: 'https://localhost:7282',
  IMAGE_PATH: 'http://localhost:8088/public/',
  ENVIRONMENT: 'development',
  PERSIST_STORE_NAME: 'boilerplate',
  CACHE_TOKEN: 'a9b25be0-008a-11ef-8551-bfeb20d073e6',
};

export const AVAILABLE_LANGUAGES: ILanguage[] = [
  {
    code: 'ar',
    dir: 'rtl',
  },
  {
    code: 'en',
    dir: 'ltr',
  },
];

export const { ENVIRONMENT, PERSIST_STORE_NAME, BASE_URL, IMAGE_PATH, CACHE_TOKEN } = appConfig;
export default appConfig;
