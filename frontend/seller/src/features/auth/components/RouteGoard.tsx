import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/** Dashboard routes: signed-out visitors go to /sign-in. */
export function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  return <Outlet />;
}

/** Sign-in / sign-up routes: signed-in sellers go to the dashboard. */
export function GuestOnly() {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
}
