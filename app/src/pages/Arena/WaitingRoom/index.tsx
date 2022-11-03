import { FC, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import DefaultButton from '../../../components/buttons/DefaultButton';
import useEthContext from '../../../hooks/useEthContext';
import useArenaContext from '../../../hooks/useArenaContext';
import { ROUTES } from '../../../router/constants';
import WaitingChallenger from '../WaitingChallenger';
import { Arena, ArenaStatus, Player } from '../../../types';
import Loader from '../../../components/Loader';
import { thereWasAnError } from '../../../utils/toasters';

import * as styles from '../../../styles';

import './styles.scss';

const WaitingRoom: FC = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { getPendingArena } = useArenaContext();
  const { player } = useEthContext();
  const [arena, setArena] = useState<Arena | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) {
      return;
    }
    (async () => {
      try {
        const arena = await getPendingArena(name);
        setArena(arena);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader text={`Please wait while loading Arena ${name} data`} />;
  }

  if (!arena || arena.status !== ArenaStatus.PENDING) {
    thereWasAnError('Cannot join a closed Arena. Try to join another one.');
    return <Navigate to={`/${ROUTES.ARENA}/${ROUTES.JOIN}`} />;
  }

  const openent: Player = {
    address: '.............',
    name: 'Random name',
    health: 10,
    mana: 10,
    inBattle: false,
  };

  return (
    <div className={`text-white ${styles.flexCenteredBetween} ${styles.arenaWaitingRoomContainer}`}>
      <div className={`${styles.flexCenteredCentered} flex-1 flex-col gap-16`}>
        <div>
          <h2 className="font-bold text-4xl text-center">Waiting for a challenger to join...</h2>
          <p className="text-2xl mt-5 text-center text-gray-400">
            Close your eyes <br />
            Meditate the place of your fight
          </p>
        </div>
        {player && (
          <div className="flex justify-evenly items-center flex-col sm:flex-row">
            <WaitingChallenger address={player.address} name={player.name}></WaitingChallenger>
            <span className="font-omega rounded-full bg-siteRed p-4 max-sm:my-8 sm:mx-12 border-2 border-red-900 sm:text-3xl">
              VS
            </span>
            <WaitingChallenger address={openent.address} name={openent.name}></WaitingChallenger>
          </div>
        )}

        <DefaultButton
          font="font-normal"
          extraStyle="mt-6"
          onClick={() => navigate(`/${ROUTES.ARENA}/${ROUTES.STAGE}/${name}`)}>
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
    </div>
  );
};

export default WaitingRoom;
