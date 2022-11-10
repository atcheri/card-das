import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainHeader from './Headers/MainHeader';
import Footer from './Footer';
import { ArenaStageContextProvider } from '../contexts/arenaStageContext';

import 'react-toastify/dist/ReactToastify.css';

const layoutContainer = 'text-white flex flex-col bg-siteblack';

const StageLayout: FC = () => {
  return (
    <ArenaStageContextProvider>
      <ToastContainer />
      <div className={layoutContainer}>
        <main className={'grow'}>
          <div className="px-4 sm:px-12 sm:py-6">
            <MainHeader />
          </div>
          <Outlet />
        </main>
      </div>
      <Footer />
    </ArenaStageContextProvider>
  );
};

export default StageLayout;
