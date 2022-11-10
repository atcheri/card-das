import { Result } from 'ethers/lib/utils';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

import useContractContext from '../hooks/useContractContext';
import useEthContext from '../hooks/useEthContext';
import { Arena } from '../types';
import {
  arenaMoveMadeEventHandler,
  createJoinedArenaEventHandler,
  roundEndedEventHandler,
} from '../events/createPlayerEvent';
import { joinArena, loadPendingArenas } from '../utils/ethereum';
import { arenaCreated, playerJoinedArena, playerMadeAMove } from '../utils/toasters';

type ArenaContextProps = {
  createArena: (arenaName: string) => Promise<boolean>;
  getPendingArenas: () => Promise<Arena[]>;
  joinPendingArena: (name: string) => Promise<boolean>;
};

export const ArenaContext = createContext<ArenaContextProps>({} as ArenaContextProps);

export const ArenaContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { contract, provider } = useContractContext();
  const { player } = useEthContext();

  useEffect(() => {
    if (!contract || !provider || !player) {
      return;
    }

    createJoinedArenaEventHandler({
      contract,
      provider,
      address: player.address,
      callbackWithResult: async (result: Result /*{ battleName: string; player1: string; player2: string }*/) => {
        if (result.player1 && result.player2) {
          playerJoinedArena(result.battleName);
          return;
        }
        arenaCreated(result.battleName);
      },
    });
  }, [contract, provider, player]);

  const createArena = async (arenaName: string): Promise<boolean> => {
    if (!contract) {
      return false;
    }

    await contract.createBattle(arenaName);
    return true;
  };

  const getPendingArenas = async (): Promise<Arena[]> => {
    if (!contract || !player) {
      return [];
    }
    return loadPendingArenas(contract);
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

  const value: ArenaContextProps = {
    createArena,
    getPendingArenas,
    joinPendingArena,
  };

  return <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>;
};
