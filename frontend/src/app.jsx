import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';

import App from './components/App';
import store from './slices/index';
import rollbarConfig from './rollbar';

import resources from './locales/index';

const app = async () => {
  const dictionary = filter.getDictionary('ru');
  filter.add(dictionary);

  const defaultLanguage = 'ru';

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default app;
