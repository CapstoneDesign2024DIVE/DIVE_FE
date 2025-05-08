import { useState, useEffect, useRef } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import UserModal from "@components/UserModal";
import NotificationModal from "@components/NotificationModal";
import { useNotification } from "@hooks/useNotification";

export default function UserNavbar() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { unreadCount, markAllAsRead } = useNotification();

  const userButtonRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const userModalRef = useRef(null);
  const notificationModalRef = useRef(null);

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
    const handleClickOutside = (e) => {
      if (
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target) &&
        userModalRef.current &&
        !userModalRef.current.contains(e.target) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(e.target) &&
        notificationModalRef.current &&
        !notificationModalRef.current.contains(e.target)
      ) {
        setIsUserModalOpen(false);
        setIsNotificationModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed right-0 top-0 flex h-16 items-center justify-end pr-10">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            ref={notificationButtonRef}
            className="relative rounded-full p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
            onClick={toggleNotificationModal}
          >
            <FaBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-bold text-xs text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {isNotificationModalOpen && (
            <div ref={notificationModalRef}>
              <NotificationModal onClick={(e) => e.stopPropagation()} />
            </div>
          )}
        </div>
        <div className="relative">
          <button
            ref={userButtonRef}
            className="flex items-center space-x-2 rounded-full p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
            onClick={toggleUserModal}
          >
            <FaUser size={20} />
          </button>
          {isUserModalOpen && (
            <div ref={userModalRef}>
              <UserModal onClick={(e) => e.stopPropagation()} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
