import { FC } from 'react';

import * as styles from '../../styles';

type WaitingChallengerProps = {
  address: string;
  name?: string;
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

const WaitingChallenger: FC<WaitingChallengerProps> = ({ address, name = '*****' }) => {
  const i = Math.floor(Math.random() * (avatars.length - 1));
  const path = avatars[i].path;

  return (
    <div className={`${styles.flexCenteredCentered} flex-col gap-2`}>
      <img
        src={path}
        alt="player-avatar"
        className="md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg"
      />
      <div className="text-gray-200">{name}</div>
      <div className="text-gray-200">{address.slice(0, 20)} ...</div>
    </div>
  );
};

export default WaitingChallenger;
