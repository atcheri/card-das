import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Alert from './Alert';
import Footer from './Footer';
import MainHeader from './Headers/MainHeader';

const container = 'min-h-screen flex flex-col px-4 sm:px-12 sm:py-6 relative bg-siteblack';
const content = 'flex flex-1 justify-between flex-col';
const body = 'flex flex-1 justify-center flex-col space-y-10 xl:mt-0 my-16';

const MainLayout: FC = () => {
  return (
    <>
      <Alert />
      <div className={container}>
        <MainHeader />
        <main className={content}>
          <div className={body}>
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
