import { FC } from 'react';

import { IoAlertCircleOutline } from 'react-icons/io5';

import useEthContext from '../hooks/useEthContext';

type AlertProps = {};

const alertStyles = {
  info: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
  success: 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
  error: 'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',
  warning: 'text-orange-700 bg-orange-100 rounded-lg dark:bg-orange-200 dark:text-orange-800',
};

const Alert: FC<AlertProps> = () => {
  const { alert } = useEthContext();

  if (!alert.status) {
    return null;
  }

  return (
    <>
      <div className="absolute z-10 top-5 left-0 right-0 flex items-center justify-center">
        <div
          className={`flex items-center justify-center gap-3 p-4 rounded-lg font-rajdhani font-semibold text-lg ${
            alertStyles[alert.type]
          }`}
          role="alert">
          <IoAlertCircleOutline className="text-3xl" /> {alert.message}
        </div>
      </div>
    </>
  );
};

export default Alert;
