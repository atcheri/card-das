import { ethers } from 'ethers';

import { Player } from '../types';

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
