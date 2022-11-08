import { ethers } from 'ethers';

import { Arena, ArenaStatus, Player, PlayerGameToken } from '../types';

const isPlayerInArena =
  (address: string) =>
  (arena: Arena): boolean =>
    arena.players.includes(address.toLowerCase());

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

const toPlayer = (data: any): Player => {
  return {
    address: data.playerAddress.toLowerCase(),
    name: data.playerName,
    mana: data.playerMana.toNumber(),
    health: data.playerHealth.toNumber(),
    inBattle: data.inBattle,
  };
};

const toGameToken = (data: any): PlayerGameToken => {
  return {
    id: data.id,
    name: data.name,
    attack: data.attackStrength.toNumber(),
    defense: data.defenseStrength.toNumber(),
  };
};

const toArena = (data: any): Arena => {
  return {
    status: data.battleStatus,
    hash: data.battleHash,
    name: data.name,
    players: data.players.map((p: any) => p.toLowerCase()),
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
  if (!address) {
    throw Error('cannot look for player info without any defined address');
  }

  const player = await contract.getPlayer(address);
  return toPlayer(player);
};

export const getPlayerGameToken = async (contract: ethers.Contract, address: string): Promise<PlayerGameToken> => {
  if (!contract) {
    throw Error('No contract defined to get Player game token');
  }

  const token = await contract.getPlayerToken(address);
  return toGameToken(token);
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

export const findOpenentAddress =
  (address: string) =>
  (arena: Arena): string =>
    arena.players.filter((a) => a !== address).shift() || '';
