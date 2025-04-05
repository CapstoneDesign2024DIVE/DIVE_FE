import { useNotification } from "@hooks/useNotification";

export default function NotificationModal({ onClick }) {
  const { notifications, markAsRead, markAllAsRead, clearAllNotifications } =
    useNotification();

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    if (notification.data && notification.data.videoPath) {
      window.location.href = `${notification.data.videoPath}?comment=${notification.data.commentId}`;
    }
  };

  return (
    <div
      className="absolute right-0 z-10 mt-2 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h3 className="font-bold text-lg">알림</h3>
        {notifications.length > 0 && (
          <button
            className="text-xs text-blue-600 hover:text-blue-800"
            onClick={markAllAsRead}
          >
            모두 읽음
          </button>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-center text-gray-500">
            새로운 알림이 없습니다
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`cursor-pointer px-4 py-3 hover:bg-gray-50 ${notification.read ? "bg-gray-50 opacity-70" : ""}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {notification.type === "comment" && (
                    <span className="text-blue-500">💬</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-3 text-center font-medium">
        {notifications.length > 0 ? (
          <div className="flex justify-between">
            <button
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => {}}
            >
              모든 알림 보기
            </button>
            <button
              className="text-sm text-red-600 hover:text-red-800"
              onClick={clearAllNotifications}
            >
              모두 삭제
            </button>
          </div>
        ) : (
          <button className="text-sm text-blue-600 hover:text-blue-800">
            모든 알림 보기
          </button>
        )}
      </div>
    </div>
  );
}
