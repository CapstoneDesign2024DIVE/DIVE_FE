import { useState, useEffect } from "react";
import useAuthStore from "@store/authStore";

export function useNotification() {
  const [notifications, setNotifications] = useState([]);
  const [eventSource, setEventSource] = useState(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
      return;
    }

    if (eventSource) {
      eventSource.close();
    }

    const baseUrl = import.meta.env.VITE_API_URL || "";
    const newEventSource = new EventSource(
      `${baseUrl}/notification/subscribe?token=${encodeURIComponent(accessToken)}`,
      { withCredentials: true },
    );

    newEventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "connected") return;

        if (data.commentId) {
          const notification = {
            id: data.commentId,
            type: "comment",
            content: `${data.nickname || data.username}님이 '${data.videoName}' 영상에 댓글을 남겼습니다: ${data.contents.substring(0, 30)}${data.contents.length > 30 ? "..." : ""}`,
            time: new Date(data.createdAt).toLocaleString(),
            read: false,
            data: data,
          };

          setNotifications((prev) => [notification, ...prev]);
        }
      } catch (error) {
        console.error("알림 데이터 파싱 오류:", error);
      }
    };

    newEventSource.onerror = (error) => {
      console.error("SSE 연결 오류:", error);

      setTimeout(() => {
        if (newEventSource.readyState === EventSource.CLOSED) {
          setEventSource(null);
        }
      }, 3000);
    };

    setEventSource(newEventSource);

    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (e) {
        console.error("저장된 알림 복원 오류:", e);
      }
    }

    return () => {
      if (newEventSource) {
        newEventSource.close();
      }
    };
  }, [accessToken]);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const removeNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId),
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
    removeNotification,
    clearAllNotifications,
  };
}
