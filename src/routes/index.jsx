import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";

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
              <PublicRoute>{element}</PublicRoute>
            ) : (
              <ProtectedRoute>{element}</ProtectedRoute>
            )
          }
        />
      ))}
    </Routes>
  );
}
