<<<<<<< HEAD
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    lng: "pt",
    backend: {
      loadPath: '/language/{{lng}}/common.json',
    },
  });

=======
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    lng: "pt",
    backend: {
      loadPath: '/language/{{lng}}/common.json',
    },
  });

>>>>>>> 12df3ce422b4412a3754270139293875163c09da
export default i18n;