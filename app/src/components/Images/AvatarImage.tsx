import { FC } from 'react';

import { randomAvatar } from '../../utils/images';

const sizeUnit = 4;

const sizes = {
  xs: 2 * sizeUnit,
  sm: 3 * sizeUnit,
  md: 6 * sizeUnit,
  lg: 8 * sizeUnit,
  xl: 10 * sizeUnit,
};

type AvatarImageProps = {
  address: string;
  size?: keyof typeof sizes;
};

const AvatarImage: FC<AvatarImageProps> = ({ size = 'sm' }) => {
  const px = sizes[size];
  const basePx = px * 1.5;
  // const sizeClass = `md:w-${basePx} w-${px} md:h-${basePx} h-${px}`;
  const sizeClass = 'md:w-36 w-24 md:h-36 h-24';
  return (
    <img
      src={randomAvatar().path}
      alt="player-avatar"
      className={`${sizeClass} object-contain rounded-full drop-shadow-lg`}
    />
  );
};

export default AvatarImage;
