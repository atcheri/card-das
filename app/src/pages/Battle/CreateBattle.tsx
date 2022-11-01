import { FC } from 'react';

import HeaderOne from '../../components/Headers/HeaderOne';
import CreateBattleForm from './CreateBattleForm';

const CreateBattle: FC = () => {
  return (
    <>
      <HeaderOne
        Title={<h1>Create a new Battle</h1>}
        SubTitle={
          <h2>
            And make it a <span className="font-omega">Legend</span>.
          </h2>
        }
      />
      <CreateBattleForm />
    </>
  );
};

export default CreateBattle;
