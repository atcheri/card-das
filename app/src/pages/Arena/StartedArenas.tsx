import { FC } from 'react';

import { ROUTES } from '../../router/constants';
import useEthContext from '../../hooks/useEthContext';
import useContractContext from '../../hooks/useContractContext';
import { loadUserStartedArenas } from '../../utils/ethereum';
import OpenedArenas from './OpenedArenas';

const StartedArenas: FC = () => {
  const { contract } = useContractContext();
  const { player } = useEthContext();

  if (!player) {
    return null;
  }

  return (
    <OpenedArenas
      arenasLoader={async () =>
        (await loadUserStartedArenas(player)(contract)).filter((a) => a.players.includes(player.address))
      }
      path={`/${ROUTES.ARENA}/${ROUTES.STAGE}`}
      buttonText="Resume"
    />
  );
};

export default StartedArenas;
