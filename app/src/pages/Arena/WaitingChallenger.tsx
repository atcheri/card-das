import { FC } from 'react';

import * as styles from '../../styles';

type WaitingChallengerProps = {
  address: string;
};

type Avatar = {
  name: string;
  path: string;
};

const avatars: Avatar[] = [
  {
    name: 'Nu Gundam',
    path: '/assets/sd-nue-gundam.png',
  },
  {
    name: 'Hi Nu Gundam',
    path: '/assets/sd-hi-nue-gundam.png',
  },
  {
    name: 'Sazabi',
    path: '/assets/sd-sazabi.png',
  },
  {
    name: 'Zaku Kai',
    path: '/assets/sd-zaku-kai.png',
  },
];

const WaitingChallenger: FC<WaitingChallengerProps> = ({ address }) => {
  const i = Math.floor(Math.random() * (avatars.length - 1));
  const path = avatars[i].path;

  return (
    <div className={`${styles.flexCenteredCentered} flex-col`}>
      <img
        src={path}
        alt="player-avatar"
        className="md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg"
      />
      <span className="text-gray-200">{address.slice(0, 20)} ...</span>
    </div>
  );
};

export default WaitingChallenger;
