import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
