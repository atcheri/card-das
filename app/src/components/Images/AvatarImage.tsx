import { FC } from 'react';

import DefaultImage from './DefaultImage';
import { Avatar, ImageSizes } from '../../types';

type AvatarImageProps = {
  address: string;
  avatar: Avatar;
  size?: ImageSizes | number;
};

const AvatarImage: FC<AvatarImageProps> = ({ avatar, size }) => {
  return <DefaultImage path={avatar.path} size={size} className="object-contain drop-shadow-lg" />;
};

export default AvatarImage;
