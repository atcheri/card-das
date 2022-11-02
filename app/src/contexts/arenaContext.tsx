import { createContext, FC, PropsWithChildren, useState } from 'react';

import useEthContext from '../hooks/useEthContext';
import { Arena, ArenaStatus } from '../types';

type ArenaContextProps = {
  isWaiting: boolean;
  arena: Arena;
  createArena: (arenaName: string) => void;
};

export const ArenaContext = createContext<ArenaContextProps>({} as ArenaContextProps);

const initialArena: Arena = {
  status: ArenaStatus.PENDING,
  hash: '0X0',
  name: '',
  players: [],
  moves: [],
  winner: '',
};

export const ArenaContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [arena, setArena] = useState<Arena>(initialArena);
  const { contract } = useEthContext();

  const createArena = async (arenaName: string) => {
    if (!contract) {
      return;
    }

    const arena: Arena = await contract.createBattle(arenaName);

    setArena(arena);
    setIsWaiting(true);
  };

  const value: ArenaContextProps = { isWaiting, arena, createArena };

  return <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>;
};
