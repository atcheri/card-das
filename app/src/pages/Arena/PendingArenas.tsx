import { FC } from 'react';

import useEthContext from '../../hooks/useEthContext';
import useContractContext from '../../hooks/useContractContext';
import { loadPendingArenas } from '../../utils/ethereum';
import OpenedArenas from './OpenedArenas';
import { ROUTES } from '../../router/constants';

const PendingArenas: FC = () => {
  const { contract } = useContractContext();
  const { walletAddress } = useEthContext();

  return (
    <OpenedArenas
      arenasLoader={async () =>
        (await loadPendingArenas(contract)).filter(
          (a) => !a.players.map((p) => p.toLowerCase()).includes(walletAddress.toLowerCase()),
        )
      }
      path={`/${ROUTES.ARENA}/${ROUTES.WAITING_ROOM}`}
    />
  );
};

export default PendingArenas;
