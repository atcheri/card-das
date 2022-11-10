import { ChangeEvent, FC, FormEvent, useState } from 'react';

import useEthContext from '../../hooks/useEthContext';
import PrimaryButton from '../buttons/PrimaryButton';
import { validateName } from '../../utils/validators';
import { alreadyRegistered, thereWasAnError } from '../../utils/toasters';
import useContractContext from '../../hooks/useContractContext';

import * as styles from '../../styles';

type PlayerFormProps = {};

const PlayerForm: FC<PlayerFormProps> = () => {
  const { contract } = useContractContext();
  const { walletAddress, isPlayerAlreadyRegistered } = useEthContext();
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateName(value) || value === '') {
      setPlayerName(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contract) {
      return;
    }

    if (playerName.length < 5) {
      return;
    }

    setLoading(true);
    try {
      const isPlayerRegistered = await isPlayerAlreadyRegistered(walletAddress);
      if (isPlayerRegistered) {
        console.log('player already registered', walletAddress);
        alreadyRegistered(playerName);
        return;
      }

      await contract.registerPlayer(playerName, `${playerName}_token`);
    } catch (error) {
      console.error('Player creation error:', error);
      thereWasAnError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="player-name" className={styles.label}>
        Enter the <span className="font-omega">COLYSEE</span>
      </label>
      <input
        name="player-name"
        id="player-name"
        value={playerName}
        className={styles.input}
        onChange={handleNameChange}
        placeholder="How should we call you?"
        disabled={loading}
      />
      <PrimaryButton loading={loading} disabled={loading || !validateName(playerName)} extraStyle="my-4" type="submit">
        Enter the arena
      </PrimaryButton>
    </form>
  );
};

export default PlayerForm;
