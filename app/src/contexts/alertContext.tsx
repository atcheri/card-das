import { createContext, FC, PropsWithChildren, useState } from 'react';

import { AlertType } from '../types';

type AlertContextProps = {
  alert: AlertType;
  resetAlert: () => void;
  setAlert: (alert: AlertType) => void;
};

export const AlertContext = createContext<AlertContextProps>({} as AlertContextProps);

const defaultAlert: AlertType = {
  status: false,
  type: 'info',
  message: '',
};

export const AlertContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [alert, setAlert] = useState<AlertType>(defaultAlert);

  const resetAlert = () => {
    setAlert(defaultAlert);
  };

  const value: AlertContextProps = { alert, resetAlert, setAlert };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};
