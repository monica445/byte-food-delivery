import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { GuestOnly, RequireAuth } from "./features/auth/components/RouteGoard";

import SignInPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";

import { DashboardLayout } from "./features/menu/components/DashboardLayout";
import MenuPage from "./features/menu/pages/MenuPage";
import OrdersPage from "./features/menu/pages/OrderPage";
import AccountPage from "./features/menu/pages/AccountPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest routes */}
        <Route element={<GuestOnly />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="menu" replace />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
