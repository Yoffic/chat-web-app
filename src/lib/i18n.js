import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      errors: {
        network: 'Network Error. Try Again',
      },
      inputText: 'Message',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
