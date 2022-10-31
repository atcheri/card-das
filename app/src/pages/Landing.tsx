import { FC } from 'react';

import HeaderOne from '../components/Headers/HeaderOne';

const Landing: FC = () => {
  return (
    <>
      <HeaderOne
        Title={
          <h1>
            CARD - DAS <br /> THE NFT FIGHT ARENA
          </h1>
        }
        SubTitle={<h2>This is where Epic battles start.</h2>}
      />
    </>
  );
};

export default Landing;
