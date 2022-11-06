import { FC, HTMLAttributes } from 'react';

import { ImageSizes, sizes } from '../../types';

type DefaultImageProps = {
  path: string;
  size?: ImageSizes;
} & HTMLAttributes<HTMLElement>;

const DefaultImage: FC<DefaultImageProps> = ({ path, size = 'sm', className, ...rest }) => {
  const px = sizes[size];
  const sizeClass = `w-${px} h-${px}`; // max-sm:w-${responsivePx} max-sm:h-${responsivePx}

  return <img src={path} className={`${sizeClass} ${className ? className : ''}`} />;
};

export default DefaultImage;
