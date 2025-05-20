import { useState, useEffect, useCallback } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import useAuthStore from "@store/authStore";

export function useNotification() {
  const [notifications, setNotifications] = useState([]);
  const [eventSource, setEventSource] = useState(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = useCallback((notifs) => {
    const count = notifs.filter((notif) => !notif.read).length;
    setUnreadCount(count);
  }, []);

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

    const newEventSource = new EventSourcePolyfill(
      `${baseUrl}/notification/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
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

          setNotifications((prev) => {
            const newNotifications = [notification, ...prev];
            updateUnreadCount(newNotifications);
            return newNotifications;
          });
        }
      } catch (error) {
        console.error("알림 데이터 파싱 오류:", error);
      }
    };

    newEventSource.addEventListener("video-processed", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("비디오 처리 완료 알림 수신:", data);

        if (data && data.status === "COMPLETED") {
          const notification = {
            id: `video-${data.videoId}-${Date.now()}`,
            type: "video_upload",
            content: data.message || "비디오 처리가 완료되었습니다.",
            time: new Date().toLocaleString(),
            read: false,
            data: {
              videoId: data.videoId,
              feedbackId: data.feedbackId,
            },
          };

          setNotifications((prev) => {
            const newNotifications = [notification, ...prev];
            updateUnreadCount(newNotifications);
            return newNotifications;
          });

          if (Notification.permission === "granted") {
            new Notification("비디오 처리 완료", {
              body: data.message || "비디오 처리가 완료되었습니다.",
            });
          }
        }
      } catch (error) {
        console.error("비디오 알림 데이터 파싱 오류:", error);
      }
    });

    newEventSource.addEventListener("new-comment", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("새 댓글 알림 수신:", data);

        const notification = {
          id: `comment-${data.commentId}-${Date.now()}`,
          type: "comment",
          content: `${data.nickname || data.username}님이 '${data.videoName}' 영상에 댓글을 남겼습니다: ${data.contents.substring(0, 30)}${data.contents.length > 30 ? "..." : ""}`,
          time: new Date().toLocaleString(),
          read: false,
          data: data,
        };

        setNotifications((prev) => {
          const newNotifications = [notification, ...prev];
          updateUnreadCount(newNotifications);
          return newNotifications;
        });

        if (Notification.permission === "granted") {
          new Notification("새 댓글", {
            body: notification.content,
          });
        }
      } catch (error) {
        console.error("댓글 알림 데이터 파싱 오류:", error);
      }
    });

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
        const parsedNotifications = JSON.parse(savedNotifications);
        setNotifications(parsedNotifications);
        updateUnreadCount(parsedNotifications);
      } catch (e) {
        console.error("저장된 알림 복원 오류:", e);
      }
    }

    return () => {
      if (newEventSource) {
        newEventSource.close();
      }
    };
  }, [accessToken, updateUnreadCount]);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
    updateUnreadCount(notifications);
  }, [notifications, updateUnreadCount]);

  const markAsRead = useCallback((notificationId) => {
    setNotifications((prev) => {
      const updatedNotifications = prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      );
      return updatedNotifications;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updatedNotifications = prev.map((notif) => ({
        ...notif,
        read: true,
      }));
      return updatedNotifications;
    });
  }, []);

  const removeNotification = useCallback((notificationId) => {
    setNotifications((prev) => {
      const updatedNotifications = prev.filter(
        (notif) => notif.id !== notificationId,
      );
      return updatedNotifications;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  }, []);

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
    removeNotification,
    clearAllNotifications,
  };
}
