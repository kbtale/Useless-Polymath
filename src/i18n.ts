import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Detect language or set default
// For now, we defaults to 'en'. A language switcher will control this.
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: savedLanguage,
    ns: ['common', 'doomsday', 'ordinal', 'binary', 'hexadecimal', 'time_zones', 'moon', 'guide'],
    defaultNS: 'common',
    debug: true, // Enable debug to see why files aren't loading
    backend: {
      // Path to translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    react: {
      useSuspense: true,
    }
  });

export default i18n;
