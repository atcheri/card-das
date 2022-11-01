import { FC } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import useEthContext from '../../../hooks/useEthContext';

type UserInfoProps = {};

const UserInfo: FC<UserInfoProps> = () => {
  const { player } = useEthContext();
  if (!player) {
    return null;
  }

  return (
    <div className="flex gap-4 items-center">
      <Jazzicon diameter={28} seed={jsNumberForAddress(player.address)} />
      <span className="font-omega">{player.name}</span>
    </div>
  );
};

export default UserInfo;
