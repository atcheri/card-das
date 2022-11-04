import { ethers } from 'ethers';

import { Arena, ArenaStatus, Player } from '../types';

const filterUserArena =
  (address: string) =>
  (arena: Arena): boolean => {
    return arena.players.map((name) => name.toLowerCase()).includes(address.toLowerCase());
  };

const filterPendingArena = (arena: Arena): boolean => arena.status === ArenaStatus.PENDING;

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

export const isEthereum = (): boolean => {
  return !!window.ethereum;
};

export const isNotEthereum = () => !isEthereum();

export const getPlayerInfo = async (contract: ethers.Contract, address: string): Promise<Player> => {
  if (!contract) {
    throw Error('No contract defined to get Player information');
  }

  const player = await contract.getPlayer(address);
  return {
    address: player.playerAddress,
    name: player.playerName,
    mana: player.playerMana.toNumber(),
    health: player.playerHealth.toNumber(),
    inBattle: player.inBattle,
  };
};

export const loadArena = async (c: ethers.Contract, name: string): Promise<Arena> => {
  const arena = (await c.getAllBattles())
    .slice(1)
    .map(toArena)
    .filter((a: Arena) => a.name === name)
    .pop();

  if (!arena) {
    throw Error(`Arena ${name} not found.`);
  }

  return arena;
};

export const loadPendingArenas = async (c: ethers.Contract): Promise<Arena[]> => {
  const arenas = (await c.getAllBattles()).slice(1).map(toArena).filter(filterPendingArena);
  return arenas;
};

export const loadUserArenas = async (c: ethers.Contract, p: Player): Promise<Arena[]> => {
  const arenas = (await loadPendingArenas(c)).map(toArena).filter(filterUserArena(p.address));
  return arenas;
};

export const joinArena = async (c: ethers.Contract, a: string): Promise<Arena> => {
  return c.joinBattle(a);
};
