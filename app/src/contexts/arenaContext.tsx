import { Result } from 'ethers/lib/utils';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

import useContractContext from '../hooks/useContractContext';
import useEthContext from '../hooks/useEthContext';
import { Arena, ArenaStatus, MoveType } from '../types';
import { createJoinedArenaEventHandler } from '../events/createPlayerEvent';
import { attackOrDefend, joinArena, loadArena, loadPendingArenas, loadUserArenas } from '../utils/ethereum';

type ArenaContextProps = {
  arena: Arena;
  busy: boolean;
  createArena: (arenaName: string) => void;
  getPendingArena: (name: string) => Promise<Arena | null>;
  getPendingArenas: () => Promise<Arena[]>;
  joinPendingArena: (name: string) => Promise<boolean>;
  attackOponent: () => Promise<void>;
  defendAgainst: () => Promise<void>;
};

export const ArenaContext = createContext<ArenaContextProps>({} as ArenaContextProps);

const initialArena: Arena = {
  status: ArenaStatus.NULL,
  hash: '0X0',
  name: '',
  players: [],
  moves: [],
  winner: '',
};

export const ArenaContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { contract, provider } = useContractContext();
  const [arena, setArena] = useState<Arena>(initialArena);
  const [busy, setBusy] = useState(false);
  const { player } = useEthContext();

  useEffect(() => {
    if (!contract || !player) {
      return;
    }

    const loadOnContractChange = async () => {
      const arenas = await loadUserArenas(player)(contract);
      const firstArena = arenas.filter((a) => a.status === ArenaStatus.PENDING || ArenaStatus.STARTED).shift();
      !!firstArena ? setArena(firstArena) : setArena(initialArena);
    };

    loadOnContractChange();
  }, [contract, player]);

  useEffect(() => {
    if (!contract || !provider || !player) {
      return;
    }

    createJoinedArenaEventHandler({
      contract,
      provider,
      address: player.address,
      callbackWithResult: async (result: Result) => {},
    });
  }, [contract, provider, player]);

  const createArena = async (arenaName: string) => {
    if (!contract) {
      return;
    }

    const arena: Arena = await contract.createBattle(arenaName);

    setArena(arena);
  };

  const getPendingArenas = async (): Promise<Arena[]> => {
    if (!contract || !player) {
      return [];
    }
    return loadPendingArenas(contract);
  };

  const getPendingArena = async (name: string): Promise<Arena | null> => {
    if (!contract || !player) {
      return null;
    }
    return loadArena(contract, name);
  };

  const joinPendingArena = async (arenaName: string): Promise<boolean> => {
    if (!contract || !player) {
      return false;
    }

    const joinedArena = await joinArena(contract, arenaName);
    console.log('joinedArena:', joinedArena);
    return true;
    // TODO: need to double check how the joinedArena object looks like
    // return joinedArena.players[joinedArena.players.length - 1] === player.address;
  };

  const _attackOrDefend = (move: MoveType): (() => Promise<void>) => {
    if (!contract || !arena) {
      return async () => {};
    }

    return async () => {
      setBusy((b) => !b);
      await attackOrDefend(move)(arena.name)(contract)();
      setTimeout(() => {
        setBusy((b) => !b);
      }, 3000);
      // setBusy(b => !b)
    };
  };

  const value: ArenaContextProps = {
    arena,
    busy,
    createArena,
    getPendingArena,
    getPendingArenas,
    joinPendingArena,
    attackOponent: _attackOrDefend(MoveType.Attack),
    defendAgainst: _attackOrDefend(MoveType.Defense),
  };

  return <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>;
};
