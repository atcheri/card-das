import { useEffect, useState } from 'react';

import { Arena } from '../types';
import useArenaContext from './useArenaContext';
import useContractContext from './useContractContext';
import useEthContext from './useEthContext';

const usePendingArena = (name: string) => {
  const { player } = useEthContext();
  const { getPendingArena } = useArenaContext();
  const { contract } = useContractContext();
  const [loading, setLoading] = useState(true);
  const [arena, setArena] = useState<Arena | null>(null);

  useEffect(() => {
    if (!name) {
      return;
    }
    (async () => {
      try {
        const arena = await getPendingArena(name);
        setArena(arena);
      } catch (error) {
        console.error('error:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [contract, player]);

  return { arena, loading };
};

export default usePendingArena;
