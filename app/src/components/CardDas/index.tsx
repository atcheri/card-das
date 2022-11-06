import { FC } from 'react';

import { Player } from '../../types';
import AvatarImage from '../Images/AvatarImage';
import AttackButton from '../buttons/DefenseButton';
import DefenseButton from '../buttons/AttackButton';
import ProgressBar from '../../pages/Arena/Stage/ProgressBar';

import * as styles from '../../styles';

const playerContainer = `${styles.flexCenteredCentered}`;

type CardDasProps = {
  player: Player;
};

const CardDas: FC<CardDasProps> = ({ player }) => {
  return (
    <div className={`${styles.flexCenteredCentered}`}>
      <div className="flex flex-col items-center border-2 rounded-xl min-w-full sm:min-w-[24rem]">
        <span>{player.name}</span>
        <AvatarImage address={player.address} size="6xl" />
        <div className="grow">
          <AttackButton path="/assets/double-beam-rifle-down.png" size="sm" />
          <DefenseButton path="/assets/sazabi-shield.png" size="sm" />
          <ProgressBar color="siteRed" current={50} max={100} />
          <ProgressBar color="siteBlue" current={24} max={25} />
        </div>
      </div>
    </div>
  );
};

export default CardDas;
