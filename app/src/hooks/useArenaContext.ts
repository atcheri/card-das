import { useContext } from 'react';

import { ArenaContext } from '../contexts/arenaContext';

const useArenaContext = () => useContext(ArenaContext);

export default useArenaContext;
