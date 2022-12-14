import { FC, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import DefaultButton from '../../../components/buttons/DefaultButton';
import useEthContext from '../../../hooks/useEthContext';
import useArenaContext from '../../../hooks/useArenaContext';
import { ROUTES } from '../../../router/constants';
import WaitingChallenger from './WaitingChallenger';
import { Arena, Player } from '../../../types';
import Loader from '../../../components/Loader';
import { thereWasAnError } from '../../../utils/toasters';
import useContractContext from '../../../hooks/useContractContext';
import { canPlayerJoinArena, getPlayerInfo, loadArena } from '../../../utils/ethereum';
import ArenaRules from '../../../components/ArenaRules';

import * as styles from '../../../styles';

import './styles.scss';

const anynomouPlayer: Player = {
  address: '.............',
  name: 'Random name',
  health: 10,
  mana: 10,
  inBattle: false,
  avatar: {
    path: '',
    name: '*****',
  },
};

const WaitingRoom: FC = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { joinPendingArena } = useArenaContext();
  const [loadingArenaData, setLoadingArenaData] = useState(true);
  const { player } = useEthContext();
  const { contract } = useContractContext();
  const [waitingArena, setWaitingArena] = useState<Arena | null>(null);
  const [creator, setCreator] = useState<Player>(anynomouPlayer);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!name) {
      return;
    }

    (async () => {
      const arena = await loadArena(contract, name);
      setWaitingArena(arena);
      setLoadingArenaData(false);
    })();
  }, [contract]);

  useEffect(() => {
    if (!waitingArena || !contract) {
      return;
    }
    (async () => {
      const creatorAddr = waitingArena.players[0];
      const c = await getPlayerInfo(contract, creatorAddr);
      setCreator(c);
    })();
  }, [waitingArena, contract]);

  if (loadingArenaData) {
    return <Loader text={`Please wait while loading Arena ${name} data`} />;
  }

  const canJoin = waitingArena && player && canPlayerJoinArena(player.address)(waitingArena);
  if (!canJoin) {
    thereWasAnError('Cannot join the requsted Arena. Try to join another one.');
    return <Navigate to={`/${ROUTES.ARENA}/${ROUTES.JOIN}`} />;
  }

  const handleEnterTheArena = async () => {
    try {
      setJoining(true);
      const joined = await joinPendingArena(name!);
      if (joined) {
        navigate(`/${ROUTES.ARENA}/${ROUTES.STAGE}/${name}`);
        return;
      }

      thereWasAnError(`Player ${player?.name} could not join the arena ${name} created by ${creator.name}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error('There was an error when trying to join an existing arena:', err);
        thereWasAnError(`Player ${player?.name} could not join the arena ${name} created by ${creator.name}`);
      }
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className={`text-white ${styles.flexCenteredBetween} ${styles.arenaWaitingRoomContainer}`}>
      <div className={`${styles.flexCenteredCentered} flex-1 flex-col gap-16`}>
        <div>
          <h2 className="font-bold text-4xl text-center">Waiting for a challenger to join the arena</h2>
          <h3 className="font-omega italic font-bold text-3xl text-center mt-5">{name}</h3>
          <p className="text-2xl mt-5 text-center text-gray-400">
            Close your eyes <br />
            Meditate the place of your fight
          </p>
        </div>
        {player && (
          <div className="flex justify-evenly items-center flex-col sm:flex-row">
            <WaitingChallenger player={creator}></WaitingChallenger>
            <span className="font-omega rounded-full bg-siteRed p-4 max-sm:my-8 sm:mx-12 border-2 border-red-900 sm:text-3xl">
              VS
            </span>
            <WaitingChallenger player={player}></WaitingChallenger>
          </div>
        )}

        <DefaultButton
          disabled={joining}
          loading={joining}
          font="font-normal"
          extraStyle="mt-6"
          onClick={handleEnterTheArena}>
          <span>Enter the </span>
          <span className="font-omega">ARENA</span>
        </DefaultButton>

        <div className="flex flex-col justify-center items-center gap-5">
          <p className="font-omega text-2xl">OR</p>
          <Link to={`/${ROUTES.ARENA}/${ROUTES.JOIN}`} className="text-siteBlue">
            Join another <span className="font-omega">Arena</span>
          </Link>
        </div>
      </div>
      <div className="mb-6 flex space-x-2 justify-center">
        <ArenaRules />
      </div>
    </div>
  );
};

export default WaitingRoom;
