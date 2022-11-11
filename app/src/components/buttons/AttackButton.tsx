import { FC, HTMLAttributes } from 'react';
import { TailSpin } from 'react-loader-spinner';

import useArenaStageContext from '../../hooks/useArenaStageContext';
import { ImageSizes } from '../../types';
import DefaultImage from '../Images/DefaultImage';

type AttackButtonProps = { disabled: boolean; path: string; size?: ImageSizes } & HTMLAttributes<HTMLElement>;

const AttackButton: FC<AttackButtonProps> = ({ disabled, path, size, className }) => {
  const { busy, attackOponent } = useArenaStageContext();
  const handleAttack = async () => {
    await attackOponent();
  };

  return (
    <button
      disabled={busy || disabled}
      onClick={handleAttack}
      className={`bg-slate-500 border-2 border-gray-900 duration-300 transform hover:bg-gray-50 rounded-md ${className}`}>
      {busy ? (
        <TailSpin height="55" width="55" color="#4fa94d" radius="1" wrapperClass="w-14 h-14" />
      ) : (
        <DefaultImage path={path} size={size} />
      )}
    </button>
  );
};

export default AttackButton;
