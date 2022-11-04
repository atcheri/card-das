import { FC } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import PlayerInfo from './PlayerInfo';
import useEthContext from '../../hooks/useEthContext';
import { ROUTES } from '../../router/constants';

const logo = 'w-[90px] h-[90px] object-contain';
const logoPath = '/assets/knight-gundam-bb.png';

type MainHeaderProps = {};

const MainHeader: FC<MainHeaderProps> = () => {
  const { checkingPlayer, walletAddress } = useEthContext();

  return (
    <nav className="flex items-center justify-between text-white">
      <Link to={ROUTES.HOME} className="flex items-center">
        <img src={logoPath} alt="card-das-online-game-logo" className={logo} />
        <span className="font-omega text-white text-2xl">CARD - DAS</span>
      </Link>
      {checkingPlayer ? <InfinitySpin width="100" color="#0E79B2" /> : <PlayerInfo address={walletAddress} />}
    </nav>
  );
};

export default MainHeader;
