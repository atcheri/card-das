import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

import Alert from './Alert';
import Footer from './Footer';
import { ROUTES } from '../router/constants';

const container = 'min-h-screen flex xl:flex-row flex-col relative';
const content = 'flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col';
const logo = 'w-[90px] h-[90px] object-contain';
const body = 'flex-1 flex justify-center flex-col space-y-10 xl:mt-0 my-16';
const logoPath = '/assets/knight-gundam-bb.png';

const MainLayout: FC = () => {
  return (
    <main className={container}>
      <Alert />
      <div className={content}>
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={logoPath} alt="card-das-online-game-logo" className={logo} />
          <span className="font-omega text-white text-2xl">CARD - DAS</span>
        </Link>
        <div className={body}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default MainLayout;
