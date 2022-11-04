import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './Footer';
import MainHeader from './Headers/MainHeader';

import 'react-toastify/dist/ReactToastify.css';

const mainContainer = 'min-h-screen flex flex-col bg-siteblack';
const container = 'flex flex-1 flex-col xl:flex-row relative bg-siteblack';
const content = 'flex flex-1 justify-between flex-col px-4 sm:px-12 sm:py-6 ';
const body = 'flex flex-1 justify-center flex-col space-y-10 xl:mt-0 my-16';
const LandingBackground = '/assets/landing-background.webp';
const MainLayout: FC = () => {
  return (
    <>
      <ToastContainer />
      <div className={mainContainer}>
        <div className={container}>
          <main className={content}>
            <MainHeader />
            <div className={body}>
              <Outlet />
            </div>
          </main>
          <div className="flex flex-1">
            <img
              src={LandingBackground}
              alt="card-das-background"
              className="w-full xl:h-full object-cover filter brightness-[45%]"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
