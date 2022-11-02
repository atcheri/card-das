import { FC } from 'react';
import { Link } from 'react-router-dom';

import HeaderOne from '../../components/Headers/HeaderOne';
import { ROUTES } from '../../router/constants';
import CreateArenaForm from './CreateArenaForm';

const CreateArena: FC = () => {
  return (
    <>
      <HeaderOne
        Title={<h1>Create a new Arena</h1>}
        SubTitle={
          <h2>
            And make it a <span className="font-omega">Legend</span>
          </h2>
        }
      />
      <CreateArenaForm />
      <p className="font-omega text-white text-xl">OR</p>
      <Link to={`/${ROUTES.ARENA}/${ROUTES.JOIN}`} className="text-siteBlue text-xl">
        Enter an existing <span className="font-omega">Arena</span>
      </Link>
    </>
  );
};

export default CreateArena;
