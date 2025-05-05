import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import NotFoundImg from '../../assets/404.svg';

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <div className='text-center'>
      <Image src={NotFoundImg} alt={t('PageNotFound')} fluid className='h-25' />
      <h1 className='h4 text-muted'>{t('PageNotFound')}</h1>
      <p className='text-muted'>
        {t('ButYouCanGo')} <Link to='/'>{t('ToTheMainPage')}</Link>
      </p>
    </div>
  );
};

export default Page404;
