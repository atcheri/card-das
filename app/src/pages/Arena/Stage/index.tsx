import { FC, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import ProgressBar from './ProgressBar';
import Loader from '../../../components/Loader';
import useContractContext from '../../../hooks/useContractContext';
import useEthContext from '../../../hooks/useEthContext';
import usePendingArena from '../../../hooks/usePendingArena';
import { ROUTES } from '../../../router/constants';
import { Player, PlayerGameToken } from '../../../types';
import { findOpenentAddress, getPlayerGameToken, getPlayerInfo } from '../../../utils/ethereum';
import AvatarImage from '../../../components/Images/AvatarImage';
import DefaultImage from '../../../components/Images/DefaultImage';
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

  // if (!arena || arena.players.length < 2) {
  //   thereWasAnError(`Cannot start the fight in the Arena "${name}". Try to join another one.`);
  //   return <Navigate to={`/${ROUTES.ARENA}/${ROUTES.JOIN}`} />;
  // }

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
            <CardDas player={arenaOponent} />
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
