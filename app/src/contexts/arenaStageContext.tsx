import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useContractContext from '../hooks/useContractContext';
import useEthContext from '../hooks/useEthContext';
import { Arena, MoveType, Player, PlayerGameToken } from '../types';
import { attackOrDefend, findOpenentAddress, getPlayerGameToken, getPlayerInfo, loadArena } from '../utils/ethereum';
import { moveCancelled, playerAlreadyMadeAMove } from '../utils/toasters';

// const initialArena: Arena = {
//   status: ArenaStatus.NULL,
//   hash: '0X0',
//   name: '',
//   players: [],
//   moves: [],
//   winner: '',
// };

type ArenaPlayer = Player & PlayerGameToken;

type ArenaStageContextProps = {
  arena: Arena;
  arenaPlayer: ArenaPlayer;
  arenaOponent: ArenaPlayer;
  loading: boolean;
  busy: boolean;
  attackOponent: () => Promise<void>;
  defendAgainst: () => Promise<void>;
  playerAllowedToEnterArena: (player: Player) => boolean;
};

export const ArenaStageContext = createContext<ArenaStageContextProps>({} as ArenaStageContextProps);

export const ArenaStageContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { name } = useParams();
  const { contract, provider } = useContractContext();
  const { player } = useEthContext();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [arena, setArena] = useState<Arena | null>(null);
  const [arenaPlayer, setArenaPlayer] = useState<ArenaPlayer | null>(null);
  const [arenaOponent, setArenaOponent] = useState<ArenaPlayer | null>(null);

  useEffect(() => {
    if (!name || !contract || !provider || !player) {
      return;
    }
    (async () => {
      try {
        _updateStageState(name, player);
      } catch (err) {
        console.log('err:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [name, contract, provider, player]);

  const _updateStageState = async (n: string, p: Player) => {
    const arena = await getPendingArena(n);
    if (!arena) {
      console.log('arena data not ready ...');
      return;
    }
    const playerGameToken = await getPlayerGameToken(contract, p.address);
    const oponentAddress = findOpenentAddress(p.address)(arena);
    const oponent = await getPlayerInfo(contract, oponentAddress);
    const oponentGameToken = await getPlayerGameToken(contract, oponent.address);
    setArenaPlayer({ ...p, ...playerGameToken });
    setArenaOponent({ ...oponent, ...oponentGameToken });
    setArena(arena);
  };

  const _attackOrDefend = (move: MoveType): (() => Promise<void>) => {
    if (!contract || !arena) {
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
        if (errMsg.includes('You have already made a move!')) {
          playerAlreadyMadeAMove(player!);
        } else if (errMsg.includes('Mana not sufficient for attacking!')) {
          moveCancelled(move, "You don't have enough Mana. Please try to use the defense move.");
        } else {
          moveCancelled(move);
        }
      } finally {
        setBusy((b) => !b);
      }
    };
  };

  const getPendingArena = async (name: string): Promise<Arena | null> => {
    if (!contract) {
      return null;
    }
    return loadArena(contract, name);
  };

  const playerAllowedToEnterArena = (player: Player): boolean => {
    if (!arena) {
      return false;
    }

    return arena.players.includes(player.address);
  };

  if (!arena || !arenaPlayer || !arenaOponent) {
    return null;
  }
  const value: ArenaStageContextProps = {
    arena,
    arenaPlayer,
    arenaOponent,
    loading,
    busy,
    attackOponent: _attackOrDefend(MoveType.Attack),
    defendAgainst: _attackOrDefend(MoveType.Defense),
    playerAllowedToEnterArena,
  };

  return <ArenaStageContext.Provider value={value}>{children}</ArenaStageContext.Provider>;
};
