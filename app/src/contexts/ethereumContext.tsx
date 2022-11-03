import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Result } from 'ethers/lib/utils';

import { getPlayerInfo, isEthereum, isNotEthereum } from '../utils/ethereum';
import { createNewPlayerEventHandler } from '../events/createPlayerEvent';
import { Player } from '../types';
import { InitEthereumContext } from './initEthContext';
import { playerCreated } from '../utils/toasters';

type EthereumContextProps = {
  checkingPlayer: boolean;
  player: Player | null;
  walletAddress: string;
  isPlayerAlreadyRegistered: (address: string) => Promise<boolean>;
};

export const EthereumContext = createContext({} as EthereumContextProps);

export const EthereumContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { contract, provider } = useContext(InitEthereumContext);
  const [checkingPlayer, setCheckingPlayer] = useState(() => isEthereum());
  const [player, setPlayer] = useState<Player | null>(null);
  const [walletAddress, setWalletAddress] = useState('');

  const updateWalletAddress = async () => {
    if (isNotEthereum()) {
      return;
    }

    try {
      setCheckingPlayer(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (!!accounts) {
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      console.log('eth_requestAccounts error:', error);
    } finally {
      setCheckingPlayer(false);
    }
  };

  useEffect(() => {
    updateWalletAddress();
    window.ethereum.on('accountsChanged', updateWalletAddress);
  }, []);

  useEffect(() => {
    if (!contract || !provider) {
      return;
    }

    createNewPlayerEventHandler({
      contract,
      provider,
      address: walletAddress,
      callbackWithResult: async (result: Result) => {
        playerCreated(result.owner);
        setPlayer(await getPlayerInfo(contract, walletAddress));
      },
    });
  }, [contract, provider, walletAddress]);

  useEffect(() => {
    if (!contract || !walletAddress) {
      return;
    }

    (async () => {
      try {
        setPlayer(await getPlayerInfo(contract, walletAddress));
      } catch (err) {
        setCheckingPlayer(false);
        setPlayer(null);
        console.error('getPlayerInfo err:', err);
      }
    })();
  }, [contract, walletAddress]);

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
