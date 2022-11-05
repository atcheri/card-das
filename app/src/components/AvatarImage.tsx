import { FC } from 'react';

import { randomAvatar } from '../utils/images';

type AvatarImageProps = {
  address: string;
};

const AvatarImage: FC<AvatarImageProps> = () => {
  return (
    <img
      src={randomAvatar().path}
      alt="player-avatar"
      className="md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg"
    />
  );
};

export default AvatarImage;
