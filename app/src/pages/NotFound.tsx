import { FC } from 'react';
import { Link } from 'react-router-dom';
import DefaultButton from '../components/buttons/DefaultButton';

const NotFound: FC = () => {
  return (
    <div className="flex flex-col justify-between items-center ">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-siteBlue p-2 text-sm rounded rotate-12 absolute text-white">Page Not Found</div>

      <Link to="/" className="mt-6 relative">
        <DefaultButton font="font-normal" fontColor="text-black">
          To Home
        </DefaultButton>
      </Link>
    </div>
  );
};

export default NotFound;
