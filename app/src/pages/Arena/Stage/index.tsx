import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Stage: FC = () => {
  const { name } = useParams();

  return <div className='text-white'>Stage {name}</div>;
};

export default Stage;
