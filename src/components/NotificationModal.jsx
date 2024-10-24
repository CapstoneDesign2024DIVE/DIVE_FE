import { mockNotification } from "@mocks/notificationMock";

export default function NotificationModal({ onClick }) {
  return (
    <div
      className="absolute right-0 z-10 mt-2 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      onClick={onClick}
    >
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="font-bold text-lg">알림</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {mockNotification.map((notification) => (
          <div
            key={notification.id}
            className="cursor-pointer px-4 py-3 font-medium hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {notification.type === "comment" && (
                  <span className="text-blue-500">💬</span>
                )}
                {notification.type === "like" && (
                  <span className="text-red-500">❤️</span>
                )}
                {notification.type === "mention" && (
                  <span className="text-green-500">@</span>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">{notification.content}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-4 py-3 text-center font-medium">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          모든 알림 보기
        </button>
      </div>
    </div>
  );
}
