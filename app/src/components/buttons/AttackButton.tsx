import { FC, HTMLAttributes } from 'react';

import { ImageSizes } from '../../types';
import DefaultImage from '../Images/DefaultImage';

type DefenseButtonProps = { path: string; size?: ImageSizes } & HTMLAttributes<HTMLElement>;

const DefenseButton: FC<DefenseButtonProps> = ({ path, size, className }) => {
  return (
    <button
      className={`bg-slate-800 bg-opacity-20 border-2 border-gray-400 duration-300 transform hover:translate-y-[2px] hover:bg-slate-50 rounded-md ${className}`}>
      <DefaultImage path={path} size={size} />
    </button>
  );
};

export default DefenseButton;
