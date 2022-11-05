import { FC } from 'react';
import { Oval } from 'react-loader-spinner';

import * as styles from '../styles';

type LoaderProps = { color?: string; secondaryColor?: string; text?: string };

const Loader: FC<LoaderProps> = ({ color = '#0E79B2', secondaryColor = '#36A1DA', text = '' }) => {
  return (
    <div className={styles.arenaWaitingRoomContainer}>
      <div className={`${styles.flexCenteredCentered} flex-col h-screen text-white`}>
        <Oval
          height={120}
          width={120}
          color={color}
          secondaryColor={secondaryColor}
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        {text && <div className="px-2 my-8 text-2xl">{text}</div>}
      </div>
    </div>
  );
};

export default Loader;
