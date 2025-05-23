import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "@layouts/ProtectedLayout";
import PublicRoute from "./PublicRoute";
import PublicLayout from "@layouts/PublicLayout";
import LandingPage from "@pages/Landing";
import LoginPage from "@pages/Login";
import LoginCallback from "@pages/Login/LoginCallback";
import SignUpPage from "@pages/SignUp";
import QuestionSetPage from "@pages/QuestionSet";
import VideoPage from "@pages/Video";
import SelectQuestionPage from "@pages/Practice/SelectQuestion";
import SettingPage from "@pages/Practice/Setting";
import MyPage from "@pages/MyPage";
import MyVideo from "@pages/MyPage/Video";
import MyQuestionSet from "@pages/MyPage/QuestionSet";
import QuestionSetDetailPage from "@pages/QuestionSet/QuestionSetDetailPage";
import InterviewPage from "@pages/Practice/InterviewPage";
import VideoDetailPage from "@pages/Video/VideoDetailPage";

const routes = [
  { path: "/", element: <LandingPage />, isPublic: true },
  { path: "/login", element: <LoginPage />, isPublic: true },
  { path: "/signup", element: <SignUpPage />, isPublic: true },
  { path: "/videos", element: <VideoPage />, isPublic: false },
  { path: "/questionSets", element: <QuestionSetPage />, isPublic: false },
  { path: "/practice", element: <SelectQuestionPage />, isPublic: false },
  { path: "/setting", element: <SettingPage />, isPublic: false },
  {
    path: "/myPage",
    element: <MyPage />,
    isPublic: false,
  },
  {
    path: "/myPage/video",
    element: <MyVideo />,
    isPublic: false,
  },
  {
    path: "/myPage/questionSet",
    element: <MyQuestionSet />,
    isPublic: false,
  },
  {
    path: "/questionSets/:id",
    element: <QuestionSetDetailPage />,
    isPublic: false,
  },
  {
    path: "/interview",
    element: <InterviewPage />,
    isPublic: false,
  },
  {
    path: "/videos/:id",
    element: <VideoDetailPage />,
    isPublic: false,
  },
  {
    path: "/auth/:provider/callback",
    element: <LoginCallback />,
    isPublic: true,
  },
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
