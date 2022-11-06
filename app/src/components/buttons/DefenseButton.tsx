import { FC } from 'react';

import { ImageSizes } from '../../types';
import DefaultImage from '../Images/DefaultImage';

type AttackButtonProps = { path: string; size: ImageSizes };

const AttackButton: FC<AttackButtonProps> = ({ path, size }) => {
  return (
    <button className="bg-slate-500 border-2 border-gray-900 duration-300 transform hover:translate-y-[2px] hover:bg-gray-50 rounded-md">
      <DefaultImage path={path} size={size} />
    </button>
  );
};

export default AttackButton;
