import { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { ABI, ADDRESS } from '../contract';

type AlertType = {
  status: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
};

type EthereumContextProps = {
  contract: ethers.Contract | null;
  walletAddress: string;
  alert: AlertType;
  setShowAlert: (alert: AlertType) => void;
};

const defaultAlert: AlertType = {
  status: false,
  type: 'info',
  message: '',
};

export const EthereumContext = createContext({} as EthereumContextProps);

export const EthereumContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [alert, setAlert] = useState<AlertType>(defaultAlert);

  const updateWalletAddress = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!!accounts) {
      setWalletAddress(accounts[0]);
    }
  };

  useEffect(() => {
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
    const timeout = setTimeout(() => {
      setAlert(defaultAlert);
    }, 5_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  const handleAlert = (alert: AlertType) => {
    setAlert(alert);
  };

  const value: EthereumContextProps = {
    contract,
    walletAddress,
    alert,
    setShowAlert: handleAlert,
  };
  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
};
