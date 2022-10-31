import { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

type EthereumContextProps = {};

export const EthereumContext = createContext({} as EthereumContextProps);

export const EthereumContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const value: EthereumContextProps = {};
  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
};
