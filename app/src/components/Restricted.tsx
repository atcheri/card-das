import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useEthContext from '../hooks/useEthContext';
import { ROUTES } from '../router/constants';
import { mustBeRegistered } from '../utils/toasters';
import Loader from './Loader';

const Restricted: FC = () => {
  const { checkingPlayer, player } = useEthContext();

  if (!player && checkingPlayer) {
    return <Loader text="Please wait while loading data" />;
  }

  if (!player) {
    mustBeRegistered();
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default Restricted;
