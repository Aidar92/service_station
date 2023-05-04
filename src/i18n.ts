import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { loadMessages, locale } from 'devextreme/localization';

import ruMessages from 'devextreme/localization/messages/ru.json';

loadMessages(ruMessages);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json?nocache=${Date.now()}`,
    },
    fallbackLng: 'ru-RU',
    debug: false,
    defaultNS: 'common',
    fallbackNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    load: 'currentOnly',
    ns: ['common'],
  });

i18n.on('languageChanged', (lng) => locale(lng));

export default i18n;
