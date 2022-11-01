import { FC } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/buttons/PrimaryButton';

import HeaderOne from '../components/Headers/HeaderOne';
import PlayerForm from '../components/PlayerForm';
import { ROUTES } from '../router/constants';

const Landing: FC = () => {
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
            This is where Epic <span className="font-omega">battles</span> begin
          </h2>
        }
      />
      <PlayerForm />
      <Link to={`${ROUTES.HOME}${ROUTES.BATTLE}/${ROUTES.CREATE}`}>
        <PrimaryButton>TO ARENA</PrimaryButton>
      </Link>
    </>
  );
};

export default Landing;
