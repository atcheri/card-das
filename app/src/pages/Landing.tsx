import { FC } from 'react';

import HeaderOne from '../components/Headers/HeaderOne';
import PlayerForm from '../components/PlayerForm';

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
    </>
  );
};

export default Landing;
