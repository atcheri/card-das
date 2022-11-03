import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ContractContextProvider } from './contexts/contractContext';
import { EthereumContextProvider } from './contexts/ethereumContext';
import { ArenaContextProvider } from './contexts/arenaContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContractContextProvider>
      <EthereumContextProvider>
        <ArenaContextProvider>
          <App />
        </ArenaContextProvider>
      </EthereumContextProvider>
    </ContractContextProvider>
  </React.StrictMode>,
);
