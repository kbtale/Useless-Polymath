import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: savedLanguage,
    ns: ['common', 'doomsday', 'ordinal', 'binary', 'hexadecimal', 'time_zones', 'moon', 'guide'],
    defaultNS: 'common',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
