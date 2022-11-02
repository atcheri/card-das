import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import DefaultButton from '../../../components/buttons/DefaultButton';
import useEthContext from '../../../hooks/useEthContext';
import { ROUTES } from '../../../router/constants';
import WaitingChallenger from '../WaitingChallenger';
import { Player } from '../../../types';

import * as styles from '../../../styles';

import './styles.scss';

const ArenaWaitingRoom: FC = () => {
  const { player } = useEthContext();
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
          <div className="flex justify-evenly items-center mt-20">
            <WaitingChallenger address={player.address}></WaitingChallenger>
            <span className="font-omega rounded-full bg-siteRed p-4 mx-12 border-2 border-red-900 text-3xl">VS</span>
            <WaitingChallenger address={openent.address}></WaitingChallenger>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArenaWaitingRoom;
