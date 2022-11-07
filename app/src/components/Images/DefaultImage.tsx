import { FC, HTMLAttributes } from 'react';

import { ImageSizes, sizes } from '../../types';

type DefaultImageProps = {
  path: string;
  size?: ImageSizes | number;
} & HTMLAttributes<HTMLElement>;

const DefaultImage: FC<DefaultImageProps> = ({ path, size, className, ...rest }) => {
  let sizeClass = `w-14 h-14`; // max-sm:w-${responsivePx} max-sm:h-${responsivePx}
  if (size) {
    if (typeof size === 'number') {
      sizeClass = `w-${size} h-${size}`;
    } else {
      const px = sizes[size];
      sizeClass = `w-${px} h-${px}`;
    }
    console.log('sizeClass:', sizeClass);
  }

  return (
    <div className={sizeClass}>
      <img src={path} className={`${className ? className : ''}`} />
    </div>
  );
};

export default DefaultImage;
