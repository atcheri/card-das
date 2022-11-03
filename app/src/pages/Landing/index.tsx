import { FC } from 'react';

import LandingContent from './LandingContent';
import LandingHeader from './LandingHeader';

const Landing: FC = () => {
  return (
    <>
      <LandingHeader />
      <LandingContent />
    </>
  );
};

export default Landing;
