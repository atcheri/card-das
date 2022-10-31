import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const container = 'min-h-screen flex xl:flex-row flex-col relative';
const content = 'flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col';
const logo = 'w-[160px] h-[60px] object-contain cursor-pointer';
const body = 'flex-1 flex justify-center flex-col xl:mt-0 my-16';
const logoPath = '/assets/knight-gundam-bb.png';

const MainLayout: FC = () => {
  return (
    <main className={container}>
      <div className={content}>
        <img src={logoPath} alt="card-das-online-game-logo" className={logo} />
        <h1 className="font-omega">CARD - DAS</h1>
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
