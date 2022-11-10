import { useContext } from 'react';

import { ArenaStageContext } from '../contexts/arenaStageContext';

const useArenaStageContext = () => useContext(ArenaStageContext);

export default useArenaStageContext;
