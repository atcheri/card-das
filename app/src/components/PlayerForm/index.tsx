import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import useEthContext from '../../hooks/useEthContext';
import PrimaryButton from '../buttons/PrimaryButton';
import { validateName } from '../../utils/validators';
import { alreadyRegistered, thereWasAnError } from '../../utils/toasters';
import useContractContext from '../../hooks/useContractContext';
import { registering } from '../../store';
import { useNavigate } from 'react-router-dom';

import * as styles from '../../styles';
import { ROUTES } from '../../router/constants';

type PlayerFormProps = {};

const PlayerForm: FC<PlayerFormProps> = () => {
  const { contract } = useContractContext();
  const { player, walletAddress, isPlayerAlreadyRegistered } = useEthContext();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [busy, setBusy] = useAtom(registering);

  useEffect(() => {
    if (!player) {
      return;
    }

    navigate(`/${ROUTES.ARENA}/${ROUTES.JOIN}`);
  }, [player]);

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

    setBusy((p) => !p);
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
      setBusy((p) => !p);
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
        disabled={busy}
      />
      <PrimaryButton loading={busy} disabled={busy || !validateName(playerName)} extraStyle="my-4" type="submit">
        Enter the arena
      </PrimaryButton>
    </form>
  );
};

export default PlayerForm;
