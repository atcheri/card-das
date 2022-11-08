import { FC, PropsWithChildren } from 'react';

type DrawerProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({ children, isOpen, toggleOpen }) => {
  return (
    <div
      className={`
        absolute p-6 right-0 top-0 h-screen rounded-md flex-col transition-all ease-in duration-300 
        bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-90
        ${isOpen ? 'translate-x-full' : 'translate-x-0'} backdrop-blur-3xl`}>
      <div className="text-right">
        <button className="mb-6" onClick={toggleOpen}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {children}
    </div>
  );
};
export default Drawer;
