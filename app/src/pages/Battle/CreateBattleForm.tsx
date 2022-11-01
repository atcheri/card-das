import { ChangeEvent, FC, FormEvent, useState } from 'react';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import * as styles from '../../styles';
import { validateName } from '../../utils/validators';

type CreateBattleFormProps = {};

const CreateBattleForm: FC<CreateBattleFormProps> = () => {
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
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="battle-name" className={styles.label}>
        Enter your <span className="font-omega">BATTLE NAME</span>
      </label>
      <input
        name="battle-name"
        id="battle-name"
        value={name}
        className={styles.input}
        onChange={handleNameChange}
        placeholder="example: Planet-Vegeta"
        disabled={loading}
      />
      <PrimaryButton loading={loading} loadingText="Generating ..." disabled={loading} extraStyle="my-4" type="submit">
        Generate
      </PrimaryButton>
    </form>
  );
};

export default CreateBattleForm;
