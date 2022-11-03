import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

import useContractContext from '../hooks/useContractContext';
import useEthContext from '../hooks/useEthContext';
import { Arena, ArenaStatus } from '../types';
import { loadArena, loadPendingArenas, loadUserArenas } from '../utils/ethereum';

type ArenaContextProps = {
  isWaiting: boolean;
  arena: Arena;
  createArena: (arenaName: string) => void;
  getPendingArena: (name: string) => Promise<Arena | null>;
  getPendingArenas: () => Promise<Arena[]>;
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
  const { contract } = useContractContext();
  const [isWaiting, setIsWaiting] = useState(false);
  const [arena, setArena] = useState<Arena>(initialArena);
  const { player } = useEthContext();

  useEffect(() => {
    if (!contract || !player) {
      return;
    }

    const loadOnContractChange = async () => {
      const arenas = await loadUserArenas(contract, player);
      const firstArena = arenas.filter((a) => a.status === ArenaStatus.PENDING || ArenaStatus.STARTED).shift();
      !!firstArena ? setArena(firstArena) : setArena(initialArena);
    };

    loadOnContractChange();
  }, [contract, player]);

  useEffect(() => {
    arena.status === ArenaStatus.PENDING ? setIsWaiting(true) : setIsWaiting(false);
  }, [arena]);

  const createArena = async (arenaName: string) => {
    if (!contract) {
      return;
    }

    const arena: Arena = await contract.createBattle(arenaName);

    setArena(arena);
    setIsWaiting(true);
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

  const value: ArenaContextProps = { isWaiting, arena, createArena, getPendingArena, getPendingArenas };

  return <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>;
};
