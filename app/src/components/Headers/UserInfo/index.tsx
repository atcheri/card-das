import { FC, useEffect } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

type UserInfoProps = { address: string };

const UserInfo: FC<UserInfoProps> = ({ address }) => {
  if (!address) {
    return null;
  }

  return (
    <div className="flex gap-4 items-center">
      <Jazzicon diameter={28} seed={jsNumberForAddress(address)} />
      <span className="font-omega">{address.slice(0, 5)}</span>
    </div>
  );
};

export default UserInfo;
