import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { ABI, ADDRESS } from '../contract';

type ContractContextProps = {
  contract: ethers.Contract;
  provider: ethers.providers.Web3Provider;
  init: () => void;
};

export const ContractContext = createContext({} as ContractContextProps);

export const ContractContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [loaded, isLoaded] = useState(false);
  const [contract, setContract] = useState<ethers.Contract>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    if (loaded) {
      return;
    }

    initContractAndProvider();
  }, []);

  const initContractAndProvider = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(provider);
      setContract(contract);
      console.info('contract and provider initiliazed');
    } catch (error) {
      console.log('initialization of contract and provider failed:', error);
    } finally {
      isLoaded(true);
    }
  };

  const value: ContractContextProps = {
    contract: contract!,
    provider: provider!,
    init: initContractAndProvider,
  };
  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};
