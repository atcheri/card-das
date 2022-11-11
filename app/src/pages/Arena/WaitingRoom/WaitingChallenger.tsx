import { FC } from 'react';

import AvatarImage from '../../../components/Images/AvatarImage';
import { Player } from '../../../types';

import * as styles from '../../../styles';

type WaitingChallengerProps = {
  player: Player;
  name?: string;
};

const WaitingChallenger: FC<WaitingChallengerProps> = ({ player }) => {
  return (
    <div className={`${styles.flexCenteredCentered} flex-col gap-2`}>
      <AvatarImage address={player.address} avatar={player.avatar} />
      <div className="text-gray-200">{player.name}</div>
      <div className="text-gray-200">{player.address.slice(0, 20)} ...</div>
    </div>
  );
};

export default WaitingChallenger;
