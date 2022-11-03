import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { InitEthereumContextProvider } from './contexts/initEthContext';
import { EthereumContextProvider } from './contexts/ethereumContext';
import { ArenaContextProvider } from './contexts/arenaContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InitEthereumContextProvider>
      <EthereumContextProvider>
        <ArenaContextProvider>
          <App />
        </ArenaContextProvider>
      </EthereumContextProvider>
    </InitEthereumContextProvider>
  </React.StrictMode>,
);
