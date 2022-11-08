import { FC, HTMLAttributes } from 'react';
import { TailSpin } from 'react-loader-spinner';

import useArenaContext from '../../hooks/useArenaContext';
import { ImageSizes } from '../../types';
import DefaultImage from '../Images/DefaultImage';

type AttackButtonProps = { path: string; size?: ImageSizes } & HTMLAttributes<HTMLElement>;

const AttackButton: FC<AttackButtonProps> = ({ path, size, className }) => {
  const { attackOponent, busy } = useArenaContext();
  const handleAttach = async () => {
    await attackOponent();
  };

  return (
    <button
      disabled={busy}
      onClick={handleAttach}
      className={`bg-slate-500 border-2 border-gray-900 duration-300 transform hover:translate-y-[2px] hover:bg-gray-50 rounded-md ${className}`}>
      {busy ? (
        <TailSpin height="55" width="55" color="#4fa94d" radius="1" wrapperClass="w-14 h-14" />
      ) : (
        <DefaultImage path={path} size={size} />
      )}
    </button>
  );
};

export default AttackButton;
