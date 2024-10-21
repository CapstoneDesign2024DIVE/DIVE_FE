import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

export default function Navbar() {
  const [openMenuItem, setOpenMenuItem] = useState(null);
  const navigate = useNavigate();

  const interviewVideos = [
    { name: "ALL" },
    { name: "Frontend" },
    { name: "Backend" },
    { name: "Android" },
    { name: "iOS" },
    { name: "DevOps" },
  ];

  const questionSets = [
    { name: "ALL" },
    { name: "Frontend" },
    { name: "Backend" },
    { name: "Android" },
    { name: "iOS" },
    { name: "DevOps" },
    { name: "CS" },
  ];

  const handleMenuItemClick = (index, path) => {
    setOpenMenuItem((prevOpen) => (prevOpen === index ? null : index));
    navigate(path);
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
          onClick={() => handleMenuItemClick(0, "/videos")}
        />
        <MenuItem
          title="면접 세트 보기"
          items={questionSets}
          isOpen={openMenuItem === 1}
          onClick={() => handleMenuItemClick(1, "/questionSets")}
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
