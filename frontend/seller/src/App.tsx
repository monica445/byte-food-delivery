import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/providers/AuthProvider";
import { router } from "./router";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
