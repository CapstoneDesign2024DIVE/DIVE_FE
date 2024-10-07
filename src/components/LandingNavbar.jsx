import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-32 py-3 z-50">
        <Link to="/" className="font-bold text-2xl flex items-center">
          DIVE
        </Link>
        <div className="flex items-center">
          <Link
            to="/login"
            className="font-medium mr-8 text-gray-800 hover:text-gray-500"
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
