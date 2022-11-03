import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Result } from 'ethers/lib/utils';

import { isEthereum, isNotEthereum } from '../utils/ethereum';
import { createNewPlayerEventHandler } from '../events/createPlayerEvent';
import { Player } from '../types';
import { InitEthereumContext } from './initEthContext';

type EthereumContextProps = {
  checkingPlayer: boolean;
  player: Player | null;
  walletAddress: string;
  isPlayerAlreadyRegistered: (address: string) => Promise<boolean>;
  getPlayerInfo: (address: string) => Promise<Player>;
};

export const EthereumContext = createContext({} as EthereumContextProps);

export const EthereumContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { contract, provider } = useContext(InitEthereumContext);
  const [checkingPlayer, setCheckingPlayer] = useState(() => isEthereum());
  const [player, setPlayer] = useState<Player | null>(null);
  const [walletAddress, setWalletAddress] = useState('');

  // const resetContext = () => {
  //   setPlayer(null);
  //   setWalletAddress('');
  // };

  const updateWalletAddress = async () => {
    if (isNotEthereum()) {
      return;
    }

    try {
      setCheckingPlayer(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('accounts:', accounts);
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
      callbackWithResult: (result: Result) => {
        alert({ status: true, type: 'success', message: `Player registered with address: ${result.owner}` });
      },
    });
  }, [contract, provider, walletAddress]);

  const isPlayerAlreadyRegistered = (address: string): Promise<boolean> => {
    return contract && contract.isPlayer(address);
  };

  const getPlayerInfo = async (address: string): Promise<Player> => {
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

  const value: EthereumContextProps = {
    checkingPlayer,
    player,
    walletAddress,
    isPlayerAlreadyRegistered,
    getPlayerInfo,
  };
  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
};
