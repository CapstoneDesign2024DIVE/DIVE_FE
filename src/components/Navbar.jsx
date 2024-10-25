import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import useNavbarStore from "@store/navbarStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { openMenuItem, setOpenMenuItem } = useNavbarStore();

  const interviewVideos = [
    "ALL",
    "Frontend",
    "Backend",
    "Android",
    "iOS",
    "DevOps",
  ];

  const questionSets = [
    "ALL",
    "Frontend",
    "Backend",
    "Android",
    "iOS",
    "DevOps",
    "CS",
  ];

  const handleMenuClick = (index, path) => {
    setOpenMenuItem(openMenuItem === index ? null : index);
    navigate(path);
  };

  const handleVideoItemClick = (index) => {
    if (interviewVideos[index] === "ALL") {
      navigate("/videos");
    } else {
      navigate(`/videos?category=${interviewVideos[index]}`);
    }
  };

  const handleQuestionSetItemClick = (index) => {
    if (questionSets[index] === "ALL") {
      navigate("/questionSets");
    } else {
      navigate(`/questionSets?category=${questionSets[index]}`);
    }
  };

  const handleLinkClick = (path) => {
    setOpenMenuItem(null);
    navigate(path);
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-56 bg-white">
      <div className="flex flex-col px-3 py-5">
        <div className="mb-4 pl-4">
          <Link to="/" className="inline-block font-bold text-2xl">
            DIVE
          </Link>
        </div>
        <Link
          to="/practice"
          className="block rounded-xl py-2 pl-4 font-medium text-lg hover:bg-gray-100"
          onClick={() => handleLinkClick("/practice")}
        >
          면접 연습하기
        </Link>
        <MenuItem
          title="면접 영상 보기"
          items={interviewVideos}
          isOpen={openMenuItem === 0}
          onClick={() => handleMenuClick(0, "/videos")}
          onItemClick={handleVideoItemClick}
        />
        <MenuItem
          title="면접 세트 보기"
          items={questionSets}
          isOpen={openMenuItem === 1}
          onClick={() => handleMenuClick(1, "/questionSets")}
          onItemClick={handleQuestionSetItemClick}
        />
        <Link
          to="/resumes"
          className="block rounded-xl py-2 pl-4 font-medium text-lg hover:bg-gray-100"
          onClick={() => handleLinkClick("/resumes")}
        >
          합격자 이력서
        </Link>
      </div>
    </nav>
  );
}
