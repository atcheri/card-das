import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
