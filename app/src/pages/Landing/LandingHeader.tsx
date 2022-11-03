import { FC } from 'react';

import HeaderOne from '../../components/Headers/HeaderOne';

const LandingHeader: FC = () => {
  return (
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
  );
};

export default LandingHeader;
