import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) {
    /* If user is already logged in and visits "/", 
        send them to dashboard. 
        
        If there is some other state.from, preserve it. */
    const from = location.state?.from;
    if (from) {
      return (
        <Navigate to={`${from.pathname}${from.search}${from.hash}`} replace />
      );
    }
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
export default PublicRoute;
