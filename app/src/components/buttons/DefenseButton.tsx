import { FC, HTMLAttributes } from 'react';

import { ImageSizes } from '../../types';
import DefaultImage from '../Images/DefaultImage';

type AttackButtonProps = { path: string; size?: ImageSizes } & HTMLAttributes<HTMLElement>;

const AttackButton: FC<AttackButtonProps> = ({ path, size, className }) => {
  return (
    <button
      className={`bg-slate-500 border-2 border-gray-900 duration-300 transform hover:translate-y-[2px] hover:bg-gray-50 rounded-md ${className}`}>
      <DefaultImage path={path} size={size} />
    </button>
  );
};

export default AttackButton;
