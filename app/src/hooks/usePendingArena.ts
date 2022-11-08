import { useEffect, useState } from 'react';

import { Arena, Player, PlayerGameToken } from '../types';
import { findOpenentAddress, getPlayerGameToken, getPlayerInfo } from '../utils/ethereum';
import useArenaContext from './useArenaContext';
import useContractContext from './useContractContext';
import useEthContext from './useEthContext';

type ArenaPlayer = Player & PlayerGameToken;

const usePendingArena = (name: string) => {
  const { player } = useEthContext();
  const { getPendingArena } = useArenaContext();
  const { contract } = useContractContext();
  const [arenaPlayer, setArenaPlayer] = useState<ArenaPlayer | null>(null);
  const [arenaOponent, setArenaOponent] = useState<ArenaPlayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [arena, setArena] = useState<Arena | null>(null);

  useEffect(() => {
    if (!name || !contract || !player) {
      console.log('waiting for the arena data to be ready to load');
      return;
    }
    (async () => {
      try {
        const arena = await getPendingArena(name);
        if (!arena) {
          console.log('arena data not ready ...');
          return;
        }
        const playerGameToken = await getPlayerGameToken(contract, player.address);
        const oponentAddress = findOpenentAddress(player.address)(arena);
        const oponent = await getPlayerInfo(contract, oponentAddress);
        const oponentGameToken = await getPlayerGameToken(contract, oponent.address);
        setArenaPlayer({ ...player, ...playerGameToken });
        setArenaOponent({ ...oponent, ...oponentGameToken });
        setArena(arena);
      } catch (error) {
        console.error('error while getting arena player data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [contract, player]);

  const playerAllowedToEnterArena = (player: Player): boolean => {
    if (!arena) {
      return false;
    }

    return arena.players.includes(player.address);
  };

  return { arena, arenaPlayer, arenaOponent, loading, playerAllowedToEnterArena };
};

export type UsePendingArenaType = ReturnType<typeof usePendingArena>;

export default usePendingArena;
