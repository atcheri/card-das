import { FC } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import PrimaryButton from '../components/buttons/PrimaryButton';
import HeaderOne from '../components/Headers/HeaderOne';
import PlayerForm from '../components/PlayerForm';
import useEthContext from '../hooks/useEthContext';
import { ROUTES } from '../router/constants';

const Landing: FC = () => {
  const { checkingPlayer, player } = useEthContext();

  return (
    <>
      <HeaderOne
        Title={
          <h1>
            CARD - DAS <br /> THE NFT FIGHT ARENA
          </h1>
        }
        SubTitle={
          <h2>
            Where Epic <span className="font-omega">fights</span> begin
          </h2>
        }
      />
      {checkingPlayer ? (
        <div className="flex items-start flex-col text-gray-400">
          <InfinitySpin width="200" color="#0E79B2" />
          <div> Loading player data... </div>
        </div>
      ) : player ? (
        <Link to={`${ROUTES.HOME}${ROUTES.ARENA}/${ROUTES.CREATE}`}>
          <PrimaryButton>TO ARENA</PrimaryButton>
        </Link>
      ) : (
        <PlayerForm />
      )}
    </>
  );
};

export default Landing;
