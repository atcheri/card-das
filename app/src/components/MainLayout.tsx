import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './Footer';
import MainHeader from './Headers/MainHeader';

import 'react-toastify/dist/ReactToastify.css';

const container = 'min-h-screen flex flex-col relative bg-siteblack';
const content = 'flex flex-1 justify-between flex-col px-4 sm:px-12 sm:py-6 ';
const body = 'flex flex-1 justify-center flex-col space-y-10 xl:mt-0 my-16';

const MainLayout: FC = () => {
  return (
    <>
      <ToastContainer />
      <div className={container}>
        <main className={content}>
          <MainHeader />
          <div className={body}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
