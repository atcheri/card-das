import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import DefaultButton from '../../../components/buttons/DefaultButton';
import useEthContext from '../../../hooks/useEthContext';
import { ROUTES } from '../../../router/constants';
import WaitingChallenger from '../WaitingChallenger';
import { Player } from '../../../types';

import * as styles from '../../../styles';

import './styles.scss';
import useArenaContext from '../../../hooks/useArenaContext';

const WaitingRoom: FC = () => {
  const { name } = useParams();
  console.log('name:', name);
  const { isWaiting } = useArenaContext();
  const { player } = useEthContext();

  if (!isWaiting /* of game is running/finished */) {
    return null; // maybe just redirect with <Nagivate to/>
  }

  const openent: Player = {
    address: '.............',
    name: 'Random name',
    health: 10,
    mana: 10,
    inBattle: false,
  };
  const navigate = useNavigate();

  return (
    <div className={`text-white ${styles.flexCenteredBetween} ${styles.arenaWaitingRoomContainer}`}>
      <div className="w-full flex gap-[5px] justify-end px-8">
        <DefaultButton
          font="font-normal"
          extraStyle="mt-6"
          onClick={() => navigate(`${ROUTES.ARENA}/${ROUTES.COLYSEUM}`)}>
          <span>Select an</span>
          <span className="font-omega">ARENA</span>
        </DefaultButton>
      </div>

      <div className={`${styles.flexCenteredCentered} flex-1 flex-col`}>
        <h2 className="font-bold text-4xl text-center">Waiting for a challenger to join...</h2>
        <p className="text-2xl mt-5 text-center text-gray-400">
          Close your eyes <br />
          Meditate the place of your fight
        </p>
        {player && (
          <div className="flex justify-evenly items-center mt-20 flex-col sm:flex-row">
            <WaitingChallenger address={player.address}></WaitingChallenger>
            <span className="font-omega rounded-full bg-siteRed p-4 max-sm:my-8 sm:mx-12 border-2 border-red-900 sm:text-3xl">
              VS
            </span>
            <WaitingChallenger address={openent.address}></WaitingChallenger>
          </div>
        )}
        <p className="font-omega text-2xl my-20">OR</p>
        <Link to={`/${ROUTES.ARENA}/${ROUTES.JOIN}`} className="text-siteBlue">
          Join another <span className="font-omega">Arena</span>
        </Link>
      </div>
    </div>
  );
};

export default WaitingRoom;