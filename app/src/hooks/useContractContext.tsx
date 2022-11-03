import { useContext } from 'react';

import { ContractContext } from '../contexts/contractContext';

const useContractContext = () => useContext(ContractContext);

export default useContractContext;
