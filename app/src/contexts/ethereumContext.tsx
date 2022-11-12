import { ethers } from 'ethers';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { Result } from 'ethers/lib/utils';
import { useAtom } from 'jotai';

import { getPlayerInfo, isEthereum, isNotEthereum } from '../utils/ethereum';
import {
  arenaMoveMadeEventHandler,
  createNewPlayerEventHandler,
  roundEndedEventHandler,
} from '../events/createPlayerEvent';
import { Player } from '../types';
import { playerCreated, playerMadeAMove, roundEnded } from '../utils/toasters';
import useContractContext from '../hooks/useContractContext';
import { eventsCount } from '../store';

type EthereumContextProps = {
  checkingPlayer: boolean;
  player: Player | null;
  walletAddress: string;
  isPlayerAlreadyRegistered: (address: string) => Promise<boolean>;
};

export const EthereumContext = createContext({} as EthereumContextProps);

export const EthereumContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { contract, init, provider } = useContractContext();
  const [checkingPlayer, setCheckingPlayer] = useState(() => isEthereum());
  const [, setCount] = useAtom(eventsCount);
  const [player, setPlayer] = useState<Player | null>(null);
  const [walletAddress, setWalletAddress] = useState('');

  const updateWalletAddress = async () => {
    if (isNotEthereum()) {
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (!!accounts) {
        setWalletAddress(accounts[0].toLowerCase());
        init();
      }
    } catch (error) {
      console.log('eth_requestAccounts error:', error);
    }
  };

  useEffect(() => {
    if (isNotEthereum()) {
      return;
    }
    updateWalletAddress();
    window.ethereum.on('accountsChanged', updateWalletAddress);
  }, []);

  useEffect(() => {
    if (!contract || !provider || !player) {
      return;
    }

    (async () => {
      createNewPlayerEventHandler({
        contract,
        provider,
        address: walletAddress,
        callbackWithResult: async (result: Result) => {
          playerCreated(result.owner);
          _updatePlayer(contract, walletAddress);
        },
      });
      arenaMoveMadeEventHandler({
        contract,
        provider,
        callbackWithResult: async (result: Result) => {
          playerMadeAMove(player, result.shift() || '');
        },
      });
      roundEndedEventHandler({
        contract,
        provider,
        callbackWithResult: async (result: Result) => {
          roundEnded();
          setCount((p) => p + 1);
        },
      });
    })();
  }, [contract, provider, walletAddress]);

  useEffect(() => {
    if (!contract || !walletAddress) {
      return;
    }

    (async () => {
      _updatePlayer(contract, walletAddress);
    })();
  }, [contract, walletAddress]);

  const _updatePlayer = async (c: ethers.Contract, address: string) => {
    try {
      setCheckingPlayer(true);
      setPlayer(await getPlayerInfo(contract, walletAddress));
    } catch (err) {
      setPlayer(null);
      console.error('getPlayerInfo err:', err);
    } finally {
      setCheckingPlayer(false);
    }
  };

  const isPlayerAlreadyRegistered = (address: string): Promise<boolean> => {
    return contract && contract.isPlayer(address);
  };

  const value: EthereumContextProps = {
    checkingPlayer,
    player,
    walletAddress,
    isPlayerAlreadyRegistered,
  };
  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
};
