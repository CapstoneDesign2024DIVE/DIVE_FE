import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "@layouts/ProtectedLayout";
import PublicRoute from "./PublicRoute";
import PublicLayout from "@layouts/PublicLayout";
import LandingPage from "@pages/Landing";
import LoginPage from "@pages/Login";
import SignUpPage from "@pages/SignUp";
import HomePage from "@pages/Home";

const routes = [
  { path: "/", element: <LandingPage />, isPublic: true },
  { path: "/login", element: <LoginPage />, isPublic: true },
  { path: "/signup", element: <SignUpPage />, isPublic: true },
  { path: "/home", element: <HomePage />, isPublic: false },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map(({ path, element, isPublic }) => (
        <Route
          key={path}
          path={path}
          element={
            isPublic ? (
              <PublicRoute>
                <PublicLayout>{element}</PublicLayout>
              </PublicRoute>
            ) : (
              <ProtectedRoute>
                <ProtectedLayout>{element}</ProtectedLayout>
              </ProtectedRoute>
            )
          }
        />
      ))}
    </Routes>
  );
}
