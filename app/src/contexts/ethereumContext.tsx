import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { Result } from 'ethers/lib/utils';

import { getPlayerInfo, isEthereum, isNotEthereum } from '../utils/ethereum';
import { createNewPlayerEventHandler } from '../events/createPlayerEvent';
import { Player } from '../types';
import { playerCreated } from '../utils/toasters';
import useContractContext from '../hooks/useContractContext';

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
        setWalletAddress(accounts[0]);
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
        setCheckingPlayer(true);
        setPlayer(await getPlayerInfo(contract, walletAddress));
      } catch (err) {
        setPlayer(null);
        console.error('getPlayerInfo err:', err);
      } finally {
        setCheckingPlayer(false);
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
