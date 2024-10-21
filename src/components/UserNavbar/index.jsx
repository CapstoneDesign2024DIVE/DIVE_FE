import { FaBell, FaUser } from "react-icons/fa";

export default function UserNavbar() {
  return (
    <nav className="fixed right-0 top-0 flex h-16 items-center justify-end pr-10">
      <div className="flex items-center space-x-4">
        <button className="relative rounded-full p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800">
          <FaBell size={20} />
        </button>
        <button className="flex items-center space-x-2 rounded-full p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800">
          <FaUser size={20} />
        </button>
      </div>
    </nav>
  );
}
