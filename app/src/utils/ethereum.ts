import { ethers } from 'ethers';

import { Arena, ArenaStatus, Player } from '../types';

const isPlayerInArena =
  (address: string) =>
  (arena: Arena): boolean =>
    arena.players.map((name) => name.toLowerCase()).includes(address.toLowerCase());

const isPlayingInArena =
  (address: string) =>
  (arena: Arena): boolean =>
    isPlayerInArena(address)(arena) && arena.status === ArenaStatus.STARTED;

const canPlayerJoinPendingArena =
  (address: string) =>
  (arena: Arena): boolean =>
    !isPlayerInArena(address)(arena) && arena.status === ArenaStatus.PENDING;

const filterUserArena =
  (address: string) =>
  (arena: Arena): boolean =>
    isPlayerInArena(address)(arena);

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

const loadAllArenas = async (c: ethers.Contract): Promise<Arena[]> => (await c.getAllBattles()).slice(1).map(toArena);

export const loadPendingArenas = async (c: ethers.Contract): Promise<Arena[]> => {
  const arenas = (await loadAllArenas(c)).filter(filterPendingArena);
  return arenas;
};

export const loadUserArenas =
  (p: Player) =>
  async (c: ethers.Contract): Promise<Arena[]> =>
    (await loadAllArenas(c)).filter(filterUserArena(p.address));

export const joinArena = async (c: ethers.Contract, a: string): Promise<Arena> => {
  return c.joinBattle(a);
};

export const canPlayerJoinArena =
  (address: string) =>
  (arena: Arena): boolean => {
    return isPlayingInArena(address)(arena) || canPlayerJoinPendingArena(address)(arena);
  };
