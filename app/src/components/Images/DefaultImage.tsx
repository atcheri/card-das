import { FC, HTMLAttributes } from 'react';

const sizeUnit = 4;

const sizes = {
  xxs: sizeUnit,
  xs: 2 * sizeUnit,
  sm: 3 * sizeUnit,
  md: 6 * sizeUnit,
  lg: 8 * sizeUnit,
  xl: 10 * sizeUnit,
};

type DefaultImageProps = {
  path: string;
  size?: keyof typeof sizes;
} & HTMLAttributes<HTMLElement>;

const DefaultImage: FC<DefaultImageProps> = ({ path, size = 'sm', className, ...rest }) => {
  const px = sizes[size];
  const basePx = px * 1.5;
  //   const sizeClass = `md:w-${basePx} w-${px} md:h-${basePx} h-${px}`;
  const sizeClass = `md:w-20 w-20 md:h-20 h-20`;

  return (
    <img
      src={path}
      alt="player-avatar"
      className={`${sizeClass} h-1 object-contain drop-shadow-lg ${className}`}
      {...rest}
    />
  );
};

export default DefaultImage;
