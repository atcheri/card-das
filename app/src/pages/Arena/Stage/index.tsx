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
import { thereWasAnError } from '../../../utils/toasters';
import AvatarImage from '../../../components/Images/AvatarImage';
import DefaultImage from '../../../components/Images/DefaultImage';
import { randomBackground } from '../../../utils/images';

import * as styles from '../../../styles';

const playerContainer = `${styles.flexCenteredCentered} flex-col p-16 gap-2`;

const AttackButton: FC<{ path: string; size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> = ({ path, size }) => {
  return (
    <button className="bg-slate-300 bg-opacity-80 border-2 border-siteBlue duration-300 transform hover:translate-y-1 rounded-md">
      <DefaultImage path={path} size={size} />
    </button>
  );
};

const Stage: FC = () => {
  const { name } = useParams();
  const { arena, loading } = usePendingArena(name!);
  const { contract } = useContractContext();
  const { player } = useEthContext();
  const [oponent, setOponent] = useState<Player | null>(null);
  const [playerToken, setPlayerToken] = useState<PlayerGameToken | null>(null);
  const [oponentToken, setOponentToken] = useState<PlayerGameToken | null>(null);

  useEffect(() => {
    if (!contract || !arena || !player) {
      return;
    }

    (async () => {
      try {
        const playerGameToken = await getPlayerGameToken(contract, player.address);
        const oponentAddress = findOpenentAddress(player.address)(arena);
        const fetchedOpenent = await getPlayerInfo(contract, oponentAddress);
        const openentGameToken = await getPlayerGameToken(contract, fetchedOpenent.address);
        setOponent(fetchedOpenent);
        setPlayerToken(playerGameToken);
        setOponentToken(openentGameToken);
      } catch (error) {
        console.log('error:', error);
      }
    })();
  }, [contract, arena, player]);

  if (loading || !playerToken || !oponentToken) {
    return <Loader color="#C33149" secondaryColor="#5F4B66" text="Preparing the Arena..." />;
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
      {!!player && !!oponent && (
        <div className="grow flex justify-center">
          <div className="grow flex max-sm:flex-col justify-between sm:max-w-6xl">
            <div className={playerContainer}>
              <AvatarImage address={player.address} size="md" />
              <span>{player.name}</span>
              <AttackButton path="/assets/double-beam-rifle-up.png" size="xxs" />
              <ProgressBar color="green-400" current={50} max={100} />
              <ProgressBar color="siteBlue" current={24} max={25} />
            </div>
            <div className={`${styles.flexCenteredCentered} p-16`}>VS</div>
            <div className={playerContainer}>
              <AvatarImage address={oponent.address} size="md" />
              <span>{oponent.name}</span>
              <AttackButton path="/assets/double-beam-rifle-down.png" size="xxs" />
              <ProgressBar color="green-400" current={50} max={100} />
              <ProgressBar color="siteBlue" current={24} max={25} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage;
