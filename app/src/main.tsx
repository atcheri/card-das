import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AlertContextProvider } from './contexts/alertContext';
import { EthereumContextProvider } from './contexts/ethereumContext';
import { ArenaContextProvider } from './contexts/arenaContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AlertContextProvider>
      <EthereumContextProvider>
        <ArenaContextProvider>
          <App />
        </ArenaContextProvider>
      </EthereumContextProvider>
    </AlertContextProvider>
  </React.StrictMode>,
);
