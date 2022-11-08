import { FC } from 'react';

import AvatarImage from '../../../components/Images/AvatarImage';

import * as styles from '../../../styles';

type WaitingChallengerProps = {
  address: string;
  name?: string;
};

const WaitingChallenger: FC<WaitingChallengerProps> = ({ address, name = '*****' }) => {
  return (
    <div className={`${styles.flexCenteredCentered} flex-col gap-2`}>
      <AvatarImage address={address} />
      <div className="text-gray-200">{name}</div>
      <div className="text-gray-200">{address.slice(0, 20)} ...</div>
    </div>
  );
};

export default WaitingChallenger;
