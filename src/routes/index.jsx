import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import HomePage from "../pages/Home";

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
