import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { EthereumContextProvider } from './contexts/ethereumContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EthereumContextProvider>
      <App />
    </EthereumContextProvider>
  </React.StrictMode>,
);
