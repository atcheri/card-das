import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ROUTES } from "./constants";
import MainLayout from "../components/MainLayout";
import Landing from "../pages/Landing";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
