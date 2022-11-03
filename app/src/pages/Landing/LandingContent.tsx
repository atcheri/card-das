import { FC } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import ActivateWalletInfo from '../../components/ActivateWalletInfo';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PlayerForm from '../../components/PlayerForm';
import useEthContext from '../../hooks/useEthContext';
import { ROUTES } from '../../router/constants';
import { isNotEthereum } from '../../utils/ethereum';

const LandingContent: FC = () => {
  const { checkingPlayer, player } = useEthContext();

  if (checkingPlayer) {
    return (
      <div className="flex items-start flex-col text-gray-400">
        <InfinitySpin width="200" color="#0E79B2" />
        <div> Loading player data... </div>
      </div>
    );
  }

  if (isNotEthereum()) {
    return <ActivateWalletInfo />;
  }

  if (player) {
    return (
      <Link to={`${ROUTES.HOME}${ROUTES.ARENA}/${ROUTES.CREATE}`}>
        <PrimaryButton>TO ARENA</PrimaryButton>
      </Link>
    );
  }

  return <PlayerForm />;
};

export default LandingContent;
