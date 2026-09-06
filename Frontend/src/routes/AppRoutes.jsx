import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import MyUrls from "../pages/MyUrls";
import Analytics from "../pages/Analytics";
import CreateUrl from "../pages/CreateUrl";
import Profile from "../pages/Profile";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-urls" element={<MyUrls />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/:shortCode" element={<Analytics />} />
            <Route path="/create-url" element={<CreateUrl />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
