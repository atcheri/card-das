import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants';
import MainLayout from '../components/MainLayout';
import Landing from '../pages/Landing';
import CreateBattle from '../pages/Battle/CreateBattle';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path={`${ROUTES.HOME}${ROUTES.BATTLE}`}>
            <Route path={ROUTES.CREATE} element={<CreateBattle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
