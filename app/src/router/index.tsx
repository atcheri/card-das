import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants';
import NotFound from '../pages/NotFound';
import MainLayout from '../components/MainLayout';
import StageLayout from '../components/StageLayout';
import Restricted from '../components/Restricted';
import Landing from '../pages/Landing';
import CreateArena from '../pages/Arena/CreateArena';
import JoinArena from '../pages/Arena/JoinArena';
import WaitingRoom from '../pages/Arena/WaitingRoom';
import Stage from '../pages/Arena/Stage';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={`${ROUTES.HOME}${ROUTES.ARENA}`} element={<Restricted />}>
            <Route path={ROUTES.CREATE} element={<CreateArena />} />
            <Route path={ROUTES.JOIN} element={<JoinArena />} />
            <Route path={`${ROUTES.WAITING_ROOM}/:name`} element={<WaitingRoom />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={`${ROUTES.HOME}/${ROUTES.ARENA}`} element={<StageLayout />}>
          <Route path={`${ROUTES.HOME}${ROUTES.ARENA}`} element={<Restricted />}>
            <Route path={`${ROUTES.STAGE}/:name`} element={<Stage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
