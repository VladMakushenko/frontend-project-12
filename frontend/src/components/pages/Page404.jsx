import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import NotFoundImg from '../../assets/404.svg';

const Page404 = () => {
  return (
    <div className='text-center'>
      <Image src={NotFoundImg} alt='Страница не найдена' fluid className='h-25' />
      <h1 className='h4 text-muted'>{'Страница не найдена'}</h1>
      <p className='text-muted'>
        {'Но вы можете перейти'} <Link to='/'>{'на главную страницу'}</Link>
      </p>
    </div>
  );
};

export default Page404;
