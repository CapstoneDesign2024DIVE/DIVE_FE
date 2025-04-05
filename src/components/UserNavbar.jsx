import { useState, useEffect } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import UserModal from "@components/UserModal";
import NotificationModal from "@components/NotificationModal";
import { useNotification } from "@hooks/useNotification";

export default function UserNavbar() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { unreadCount } = useNotification();

  const toggleUserModal = (e) => {
    e.stopPropagation();
    setIsUserModalOpen(!isUserModalOpen);
    setIsNotificationModalOpen(false);
  };

  const toggleNotificationModal = (e) => {
    e.stopPropagation();
    setIsNotificationModalOpen(!isNotificationModalOpen);
    setIsUserModalOpen(false);
  };

  useEffect(() => {
    const closeModals = () => {
      setIsUserModalOpen(false);
      setIsNotificationModalOpen(false);
    };

    document.addEventListener("click", closeModals);
    return () => {
      document.removeEventListener("click", closeModals);
    };
  }, []);

  return (
    <nav className="fixed right-0 top-0 flex h-16 items-center justify-end pr-10">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="relative rounded-full p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
            onClick={toggleNotificationModal}
          >
            <FaBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {isNotificationModalOpen && (
            <NotificationModal onClick={(e) => e.stopPropagation()} />
          )}
        </div>
        <div className="relative">
          <button
            className="flex items-center space-x-2 rounded-full p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
            onClick={toggleUserModal}
          >
            <FaUser size={20} />
          </button>
          {isUserModalOpen && (
            <UserModal onClick={(e) => e.stopPropagation()} />
          )}
        </div>
      </div>
    </nav>
  );
}
