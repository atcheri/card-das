import { FC, HTMLAttributes } from 'react';
import { TailSpin } from 'react-loader-spinner';

import useArenaStageContext from '../../hooks/useArenaStageContext';
import { ImageSizes } from '../../types';
import DefaultImage from '../Images/DefaultImage';

type DefenseButtonProps = { disabled?: boolean; path: string; size?: ImageSizes } & HTMLAttributes<HTMLElement>;

const DefenseButton: FC<DefenseButtonProps> = ({ disabled, path, size, className }) => {
  const { busy, defendAgainst } = useArenaStageContext();
  const handleDefense = async () => {
    await defendAgainst();
  };

  return (
    <button
      disabled={busy || disabled}
      onClick={handleDefense}
      className={`bg-slate-800 bg-opacity-20 border-2 border-gray-400 duration-300 transform hover:translate-y-[2px] hover:bg-slate-50 rounded-md ${className}`}>
      {busy ? (
        <TailSpin height="55" width="55" color="#4fa94d" radius="1" wrapperClass="w-14 h-14" />
      ) : (
        <DefaultImage path={path} size={size} />
      )}
    </button>
  );
};

export default DefenseButton;
