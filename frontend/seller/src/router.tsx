import { createBrowserRouter } from "react-router-dom";
import { GuestOnly, RequireAuth } from "./features/auth/components/RouteGoard";
import SignInPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import DashboardPage from "./features/auth/pages/DashboardPage";

export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    children: [
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [{ path: "/", element: <DashboardPage /> }],
  },
]);
