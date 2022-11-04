import { FC } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import useEthContext from '../../../hooks/useEthContext';

type PlayerInfoProps = { address: string };

const PlayerInfo: FC<PlayerInfoProps> = ({ address }) => {
  const { player } = useEthContext();

  if (!address) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 items-center">
        <Jazzicon diameter={28} seed={jsNumberForAddress(address)} />
        <span className="font-omega">{player ? player.name : address.slice(0, 5)}</span>
      </div>
      <div className="self-end">{player && address.slice(0, 10)}</div>
    </div>
  );
};

export default PlayerInfo;
