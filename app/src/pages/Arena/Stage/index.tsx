import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';

import * as styles from '../../../styles';

const backgrounds: string[] = ['bg-spaceBattleships'];

const Stage: FC = () => {
  const { name } = useParams();

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader color="#C33149" secondaryColor="#5F4B66" text="Preparing the Arena..." />;
  }

  const bg = backgrounds[0];

  return <div className={`grow min-h-screen w-screen bg-cover bg-no-repeat bg-center ${bg}`}>Stage {name}</div>;
};

export default Stage;
