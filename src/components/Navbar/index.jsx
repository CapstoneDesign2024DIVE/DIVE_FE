import { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

export default function Navbar() {
  const [openMenuItem, setOpenMenuItem] = useState(null);

  const interviewVideos = [
    { name: "ALL", path: "/videos" },
    { name: "Frontend", path: "/videos/frontend" },
    { name: "Backend", path: "/videos/backend" },
    { name: "Android", path: "/videos/android" },
    { name: "iOS", path: "/videos/ios" },
    { name: "DevOps", path: "/videos/devops" },
  ];

  const interviewSets = [
    { name: "ALL", path: "/interviewSets" },
    { name: "Frontend", path: "/interviewSets/frontend" },
    { name: "Backend", path: "/interviewSets/backend" },
    { name: "Android", path: "/interviewSets/android" },
    { name: "iOS", path: "/interviewSets/ios" },
    { name: "DevOps", path: "/interviewSets/devops" },
    { name: "CS", path: "/interviewSets/cs" },
  ];

  const handleMenuItemClick = (index) => {
    setOpenMenuItem((prevOpen) => (prevOpen === index ? null : index));
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
        >
          면접 연습하기
        </Link>
        <MenuItem
          title="면접 영상 보기"
          items={interviewVideos}
          isOpen={openMenuItem === 0}
          onClick={() => handleMenuItemClick(0)}
          onClose={() => setOpenMenuItem(null)}
        />
        <MenuItem
          title="면접 세트 보기"
          items={interviewSets}
          isOpen={openMenuItem === 1}
          onClick={() => handleMenuItemClick(1)}
          onClose={() => setOpenMenuItem(null)}
        />
        <Link
          to="/resumes"
          className="block rounded-xl py-2 pl-4 font-medium text-lg hover:bg-gray-100"
        >
          합격자 이력서
        </Link>
      </div>
    </nav>
  );
}
