import { FC } from 'react';
import Tilt from 'react-parallax-tilt';

import { Player } from '../../types';
import AvatarImage from '../Images/AvatarImage';
import AttackButton from '../buttons/AttackButton';
import DefenseButton from '../buttons/DefenseButton';
import ProgressBar from '../../pages/Arena/Stage/ProgressBar';

import * as styles from '../../styles';

const playerContainer = `${styles.flexCenteredCentered}`;

type CardDasProps = {
  disabled?: boolean;
  player: Player;
};

const CardDas: FC<CardDasProps> = ({ disabled = false, player }) => {
  return (
    <div className={`${styles.flexCenteredCentered}`}>
      <Tilt glareEnable perspective={2500} glareMaxOpacity={0.2}>
        <div className="flex flex-col items-center border-2 rounded-xl min-w-full sm:min-w-[24rem] backdrop-blur-2xl">
          <span className="font-omega bg-black bg-opacity-30 text-center w-[100%] rounded-xl py-1">{player.name}</span>
          <div className="flex justify-between items-center">
            <AttackButton
              disabled={disabled}
              className="relative lg:-left-12"
              path="/assets/double-beam-rifle-down.png"
            />
            <AvatarImage address={player.address} size={60} />
            <DefenseButton disabled={disabled} className="relative lg:-right-12" path="/assets/sazabi-shield.png" />
          </div>
          <div className="flex grow w-[100%] rounded-xl">
            <div className="grow flex flex-col rounded-xl">
              <ProgressBar color="siteGreen" current={50} max={100} />
              <ProgressBar color="siteBlue" current={24} max={25} />
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default CardDas;
