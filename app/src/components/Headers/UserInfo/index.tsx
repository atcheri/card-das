import { FC } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import useEthContext from '../../../hooks/useEthContext';

type UserInfoProps = { address: string };

const UserInfo: FC<UserInfoProps> = ({ address }) => {
  const { player } = useEthContext();

  if (!address) {
    return null;
  }

  return (
    <div className="flex gap-4 items-center">
      <Jazzicon diameter={28} seed={jsNumberForAddress(address)} />
      <span className="font-omega">{player ? player.name : address.slice(0, 5)}</span>
    </div>
  );
};

export default UserInfo;
