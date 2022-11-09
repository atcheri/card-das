import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Loader from '../../../components/Loader';
import usePendingArena from '../../../hooks/usePendingArena';
import { ROUTES } from '../../../router/constants';
import { randomBackground } from '../../../utils/images';
import CardDas from '../../../components/CardDas';
import ArenaRules from '../../../components/ArenaRules';

import * as styles from '../../../styles';

const Stage: FC = () => {
  const { name } = useParams();
  const { loading, arenaPlayer, arenaOponent, playerAllowedToEnterArena } = usePendingArena(name!);

  if (loading) {
    return <Loader color="#C33149" secondaryColor="#5F4B66" text="Preparing the Arena..." />;
  }

  if (arenaPlayer && !playerAllowedToEnterArena(arenaPlayer)) {
    return (
      <Navigate
        to={`/${ROUTES.ARENA}/${ROUTES.JOIN}`}
        state={{ message: `You cannot enter the fight in the Arena "${name}". Try to join another one.` }}
      />
    );
  }

  const bg = randomBackground();

  // w-screen
  return (
    <div className={`flex flex-col min-h-[91vh] bg-cover bg-no-repeat bg-center ${bg}`}>
      <h1 className="font-omega text-center text-2xl py-6">{name}</h1>
      {!!arenaPlayer && !!arenaOponent && (
        <div className="grow flex justify-center">
          <div className="grow flex max-sm:flex-col justify-between sm:max-w-6xl">
            <CardDas player={arenaPlayer} />
            <div className={`${styles.flexCenteredCentered} p-16`}>VS</div>
            <CardDas player={arenaOponent} disabled />
          </div>
        </div>
      )}
      <div className="mb-6 flex space-x-2 justify-center">
        <ArenaRules />
      </div>
    </div>
  );
};

export default Stage;
