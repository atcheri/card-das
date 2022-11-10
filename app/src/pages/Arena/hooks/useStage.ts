import { useContext, useState } from 'react';

import useContractContext from '../../../hooks/useContractContext';
import useEthContext from '../../../hooks/useEthContext';
import { MoveType } from '../../../types';
import { attackOrDefend } from '../../../utils/ethereum';
import { moveCancelled, playerAlreadyMadeAMove } from '../../../utils/toasters';
import { ArenaStageContext } from '../../../contexts/arenaStageContext';

const useStage = () => {
  const { arena } = useContext(ArenaStageContext);
  const { player } = useEthContext();
  const { contract, provider } = useContractContext();
  const [busy, setBusy] = useState(false);

  const _attackOrDefend = (move: MoveType): (() => Promise<void>) => {
    if (!contract) {
      return async () => {};
    }

    return async () => {
      try {
        setBusy((b) => !b);
        await attackOrDefend(move)(arena.name)(contract)();
      } catch (err) {
        console.log('_attackOrDefend err:', err);
        let errMsg = '';
        if (err instanceof Error) {
          errMsg = err.message;
        } else if (typeof err === 'string') {
          errMsg = err;
        }
        errMsg.includes('You have already made a move!') ? playerAlreadyMadeAMove(player!) : moveCancelled(move);
      } finally {
        setBusy((b) => !b);
      }
    };
  };

  return {
    busy,
    attackOponent: _attackOrDefend(MoveType.Attack),
    defendAgainst: _attackOrDefend(MoveType.Defense),
  };
};

export type UseStageType = ReturnType<typeof useStage>;

export default useStage;
