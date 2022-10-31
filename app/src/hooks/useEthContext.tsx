import { useContext } from 'react';

import { EthereumContext } from '../contexts/ethereumContext';

const useEthContext = useContext(EthereumContext);

export default useEthContext;
