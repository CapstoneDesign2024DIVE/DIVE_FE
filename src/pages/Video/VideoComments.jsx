import { useState } from "react";
import { formatDate } from "@utils/dateFormat";
import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "@hooks/useComment";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@apis/comment";

const VideoComments = ({ videoId, currentUser }) => {
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContents, setEditContents] = useState({});
  const [deletingIds, setDeletingIds] = useState(new Set());

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => getComments(videoId),
  });

  const createCommentMutation = useCreateComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newComment.trim()) return;

      await createCommentMutation.mutateAsync({
        videoId,
        contents: newComment,
      });

      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleUpdate = async (comment) => {
    try {
      const content = editContents[comment.commentId];
      if (!content || !content.trim()) return;

      const oldData = queryClient.getQueryData(["comments", videoId]);
      queryClient.setQueryData(["comments", videoId], (old) =>
        old.map((c) =>
          c.commentId === comment.commentId
            ? { ...c, contents: content.trim() }
            : c,
        ),
      );

      setEditingId(null);
      setEditContents((prev) => {
        const newState = { ...prev };
        delete newState[comment.commentId];
        return newState;
      });

      await updateCommentMutation
        .mutateAsync({
          videoId,
          commentId: comment.commentId,
          contents: content,
        })
        .catch((error) => {
          queryClient.setQueryData(["comments", videoId], oldData);
          throw error;
        });
    } catch (error) {
      console.error("Failed to update comment:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (comment) => {
    try {
      if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

      setDeletingIds((prev) => new Set([...prev, comment.commentId]));

      await deleteCommentMutation.mutateAsync({
        videoId,
        commentId: comment.commentId,
        contents: comment.contents,
      });

      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(comment.commentId);
        return newSet;
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("댓글 삭제에 실패했습니다.");
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(comment.commentId);
        return newSet;
      });
    }
  };

  const startEditing = (comment) => {
    setEditingId(comment.commentId);
    setEditContents({
      ...editContents,
      [comment.commentId]: comment.contents,
    });
  };

  return (
    <div className="mt-6">
      <h2 className="mb-4 font-bold text-lg">댓글</h2>

      <div className="mb-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <img
            src={currentUser?.imageUrl || "/default-profile.png"}
            alt="프로필"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글 추가..."
              className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={createCommentMutation.isPending || !newComment.trim()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
          >
            {createCommentMutation.isPending ? "등록 중..." : "등록"}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center">댓글을 불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500">
            첫 댓글을 작성해보세요!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.commentId} className="flex gap-3">
              <img
                src={comment.imageUrl || "/default-profile.png"}
                alt="프로필"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.nickname}</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>

                {editingId === comment.commentId ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={editContents[comment.commentId] || ""}
                      onChange={(e) =>
                        setEditContents((prev) => ({
                          ...prev,
                          [comment.commentId]: e.target.value,
                        }))
                      }
                      className="flex-1 rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleUpdate(comment)}
                      disabled={updateCommentMutation.isPending}
                      className="rounded-lg bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                    >
                      {updateCommentMutation.isPending ? "수정 중..." : "수정"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditContents((prev) => {
                          const newState = { ...prev };
                          delete newState[comment.commentId];
                          return newState;
                        });
                      }}
                      disabled={updateCommentMutation.isPending}
                      className="rounded-lg bg-gray-200 px-3 py-1 disabled:opacity-50"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900">{comment.contents}</p>
                )}

                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  {currentUser?.id === comment.userId &&
                    comment.commentId !== editingId && (
                      <>
                        <button
                          onClick={() => startEditing(comment)}
                          className="hover:text-gray-900"
                          disabled={deletingIds.has(comment.commentId)}
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(comment)}
                          className="hover:text-gray-900"
                          disabled={deletingIds.has(comment.commentId)}
                        >
                          {deletingIds.has(comment.commentId)
                            ? "삭제 중..."
                            : "삭제"}
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoComments;
