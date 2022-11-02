import { ethers } from 'ethers';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

import useEthContext from '../hooks/useEthContext';
import { Arena, ArenaStatus, Player } from '../types';

type ArenaContextProps = {
  isWaiting: boolean;
  arena: Arena;
  createArena: (arenaName: string) => void;
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

const filterUserArenas =
  (address: string) =>
  (arena: Arena): boolean => {
    return arena.players.map((name) => name.toLowerCase()).includes(address.toLowerCase());
  };

const toArena = (data: any): Arena => {
  return {
    status: data.battleStatus,
    hash: data.battleHash,
    name: data.name,
    players: data.players,
    moves: data.moves,
    winner: data.winner,
  };
};

export const ArenaContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [arena, setArena] = useState<Arena>(initialArena);
  const { contract, player } = useEthContext();

  const loadAllArenas = async (c: ethers.Contract, p: Player): Promise<Arena[]> => {
    const allArenas: any[] = await c.getAllBattles();
    const arenas = allArenas.slice(1).filter(filterUserArenas(p.address)).map(toArena);
    return arenas;
  };

  useEffect(() => {
    if (!contract || !player) {
      return;
    }

    const loadOnContractChange = async () => {
      const arenas = await loadAllArenas(contract, player);
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

  const value: ArenaContextProps = { isWaiting, arena, createArena };

  return <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>;
};
