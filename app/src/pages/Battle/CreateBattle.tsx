import { FC } from 'react';

import HeaderOne from '../../components/Headers/HeaderOne';

const CreateBattle: FC = () => {
  return (
    <>
      <HeaderOne Title={<h1>Create a new Battle</h1>} SubTitle={<h2>This is where Epic battles start.</h2>} />
    </>
  );
};

export default CreateBattle;
