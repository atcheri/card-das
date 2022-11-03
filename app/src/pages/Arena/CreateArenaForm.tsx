import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import useArenaContext from '../../hooks/useArenaContext';
import { validateName } from '../../utils/validators';
import ArenaWaitingRoom from './ArenaWaitingRoom';
import { arenaCreated, thereWasAnError } from '../../utils/toasters';

import * as styles from '../../styles';

type CreateArenaFormProps = {};

const CreateArenaForm: FC<CreateArenaFormProps> = () => {
  const { createArena, isWaiting } = useArenaContext();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateName(value)) {
      setName(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createArena(name);
      arenaCreated(name);
    } catch (error) {
      thereWasAnError(`There was an error while creating your arena ${name}. Try again later.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isWaiting && <ArenaWaitingRoom />}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="arena-name" className={styles.label}>
          Enter your <span className="font-omega">ARENA NAME</span>
        </label>
        <input
          name="arena-name"
          id="arena-name"
          value={name}
          className={styles.input}
          onChange={handleNameChange}
          placeholder="example: Planet-Vegeta"
          disabled={loading}
        />
        <PrimaryButton
          loading={loading}
          loadingText="Generating ..."
          disabled={loading}
          extraStyle="my-4"
          type="submit">
          Generate
        </PrimaryButton>
      </form>
    </>
  );
};

export default CreateArenaForm;
