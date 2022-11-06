import { FC } from 'react';

import DefaultImage from './DefaultImage';
import { ImageSizes } from '../../types';
import { randomAvatar } from '../../utils/images';

type AvatarImageProps = {
  address: string;
  size?: ImageSizes;
};

const AvatarImage: FC<AvatarImageProps> = ({ size = 'lg' }) => {
  return <DefaultImage path={randomAvatar().path} size={size} className="object-contain drop-shadow-lg" />;
};

export default AvatarImage;
