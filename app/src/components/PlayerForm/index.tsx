import { ChangeEvent, FC, FormEvent, useState } from 'react';

import useEthContext from '../../hooks/useEthContext';
import { isNotEthereum } from '../../utils/ethereum';
import ActivateWalletInfo from '../ActivateWalletInfo';
import PrimaryButton from '../buttons/PrimaryButton';

const label = 'font-semibold text-2xl text-white mb-3';
const input = 'bg-siteDimBlack text-white outline-none focus:outline-siteBlue p-4 rounded-md sm:max-w-[50%] max-w-full';
const nameRegex = /^[A-Z-a-z0-9]+$/;

type PlayerFormProps = {};

const PlayerForm: FC<PlayerFormProps> = () => {
  const { contract, walletAddress, isPlayerAlreadyRegistered, setShowAlert } = useEthContext();
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || nameRegex.test(value)) {
      setPlayerName(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contract) {
      return;
    }

    setLoading(true);
    try {
      const isPlayerRegistered = await isPlayerAlreadyRegistered(walletAddress);
      if (isPlayerRegistered) {
        setShowAlert({
          status: true,
          type: 'warning',
          message: `Player "${playerName}" already exists in the colysée.`,
        });
        return;
      }

      await contract.registerPlayer(playerName, `${playerName}_token`);
      setShowAlert({
        status: true,
        type: 'success',
        message: `Player "${playerName}" entered colysée.`,
      });
    } catch (error) {
      setShowAlert({
        status: true,
        type: 'error',
        message: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  if (isNotEthereum()) {
    return <ActivateWalletInfo />;
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="player-name" className={label}>
        Enter the <span className="font-omega">COLYSEE</span>
      </label>
      <input
        name="player-name"
        id="player-name"
        value={playerName}
        className={input}
        onChange={handleNameChange}
        placeholder="How should we call you?"
        disabled={loading}
      />
      <PrimaryButton loading={loading} disabled={loading} extraStyle="my-4" type="submit">
        Enter the arena
      </PrimaryButton>
    </form>
  );
};

export default PlayerForm;
