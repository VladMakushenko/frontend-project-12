import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales/index';

import Header from './Header';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ChatPage from './pages/ChatPage';

const App = () => {
  const dictionary = filter.getDictionary('ru');
  filter.add(dictionary);

  const defaultLanguage = 'ru';

  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <div className='d-flex flex-column h-100'>
      <Router>
        <Header />

        <Routes>
          <Route path='*' element={<Page404 />} />
          <Route path='/' element={<ChatPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
        </Routes>

        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
