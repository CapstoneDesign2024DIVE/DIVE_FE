import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-32 py-3">
        <Link to="/videos" className="flex items-center font-bold text-2xl">
          DIVE
        </Link>
        <div className="flex items-center">
          <Link
            to="/login"
            className="mr-8 font-medium text-gray-800 hover:text-gray-500"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="font-medium text-gray-800 hover:text-gray-500"
          >
            회원가입
          </Link>
        </div>
      </nav>
    </>
  );
}
