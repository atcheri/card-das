import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Result } from 'ethers/lib/utils';
import Web3Modal from 'web3modal';

import { ABI, ADDRESS } from '../contract';
import { isEthereum, isNotEthereum } from '../utils/ethereum';
import { createNewPlayerEventHandler } from '../events/createPlayerEvent';
import { Player } from '../types';
import useAlertContext from '../hooks/useAlertContext';

type EthereumContextProps = {
  checkingPlayer: boolean;
  contract: ethers.Contract | null;
  player: Player | null;
  walletAddress: string;
  isPlayerAlreadyRegistered: (address: string) => Promise<boolean>;
  getPlayerInfo: (address: string) => Promise<Player>;
};

export const EthereumContext = createContext({} as EthereumContextProps);

export const EthereumContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { resetAlert, setAlert } = useAlertContext();
  const [checkingPlayer, setCheckingPlayer] = useState(() => isEthereum());
  const [player, setPlayer] = useState<Player | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const updateWalletAddress = async () => {
    if (isNotEthereum()) {
      return;
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!!accounts) {
      setWalletAddress(accounts[0]);
    }
  };

  const updatePlayer = async (addr: string) => {
    try {
      setPlayer(await getPlayerInfo(addr));
    } catch (err) {
    } finally {
      setCheckingPlayer(!checkingPlayer);
    }
  };

  useEffect(() => {
    if (!contract || !walletAddress) {
      return;
    }

    updatePlayer(walletAddress);
  }, [contract, walletAddress]);

  useEffect(() => {
    if (isNotEthereum()) {
      return;
    }

    updateWalletAddress();
    window.ethereum.on('accountsChanged', updateWalletAddress);
  }, []);

  useEffect(() => {
    const initContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(provider);
      setContract(contract);
    };

    initContractAndProvider();
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
        setAlert({ status: true, type: 'success', message: `Player registered with address: ${result.owner}` });
      },
    });
  }, [contract, provider, walletAddress]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetAlert();
    }, 5_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

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
      mana: player.playerMana,
      health: player.playerHealth,
      inBattle: player.inBattle,
    };
  };

  const value: EthereumContextProps = {
    checkingPlayer,
    contract,
    player,
    walletAddress,
    isPlayerAlreadyRegistered,
    getPlayerInfo,
  };
  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
};
