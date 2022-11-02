import { useContext } from 'react';

import { AlertContext } from '../contexts/alertContext';

const useAlertContext = () => useContext(AlertContext);

export default useAlertContext;
