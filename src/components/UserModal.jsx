import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/authStore";
import useNavbarStore from "@store/navbarStore";

export default function UserModal() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const resetOpenMenuItem = useNavbarStore((state) => state.resetOpenMenuItem);

  const handleLogout = () => {
    logout();
    resetOpenMenuItem();
    navigate("/");
  };

  const handleNavigation = (path) => {
    resetOpenMenuItem();
    navigate(path);
  };

  return (
    <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
      <div className="text-md flex flex-col items-center py-2 font-medium text-gray-700 hover:text-gray-900">
        <Link
          to="/myPage"
          className="block w-full px-4 py-2 text-center hover:bg-gray-100"
          onClick={() => handleNavigation("/myPage")}
        >
          내 정보
        </Link>
        <Link
          to="/myPage/video"
          className="block w-full px-4 py-2 text-center hover:bg-gray-100"
          onClick={() => handleNavigation("/myPage/video")}
        >
          내 영상
        </Link>
        <Link
          to="/myPage/questionSet"
          className="block w-full px-4 py-2 text-center hover:bg-gray-100"
          onClick={() => handleNavigation("/myPage/questionSet")}
        >
          내 면접 세트
        </Link>
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          내 이력서 관리
        </div>
        <div className="block w-full px-4 py-2 text-center hover:bg-gray-100">
          플랜 업그레이드
        </div>
        <div
          className="block w-full cursor-pointer px-4 py-2 text-center hover:bg-gray-100"
          onClick={handleLogout}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}
