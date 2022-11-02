import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants';
import MainLayout from '../components/MainLayout';
import Landing from '../pages/Landing';
import CreateArena from '../pages/Arena/CreateArena';
import JoinArena from '../pages/Arena/JoinArena';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={`${ROUTES.HOME}${ROUTES.ARENA}`}>
            <Route path={ROUTES.CREATE} element={<CreateArena />} />
            <Route path={ROUTES.JOIN} element={<JoinArena />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
