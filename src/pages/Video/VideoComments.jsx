import React, { useState } from "react";
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
  const [editContent, setEditContent] = useState("");

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => getComments(videoId, currentUser?.id),
  });

  const createCommentMutation = useCreateComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    createCommentMutation.mutate(
      {
        videoId,
        userId: currentUser?.id,
        contents: newComment.trim(),
      },
      {
        onSuccess: () => {
          setNewComment("");
        },
      },
    );
  };

  const handleUpdate = (commentId) => {
    if (!editContent.trim()) return;

    updateCommentMutation.mutate(
      {
        commentId,
        videoId,
        userId: currentUser?.id,
        contents: editContent.trim(),
      },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditContent("");
        },
      },
    );
  };

  const handleDelete = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate({
        commentId,
        userId: currentUser?.id,
        videoId,
      });
    }
  };

  const startEditing = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.contents);
  };

  return (
    <div className="mt-6">
      <h2 className="mb-4 font-bold text-lg">댓글</h2>

      {/* Comment Input */}
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
            disabled={!newComment.trim()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
          >
            등록
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center">댓글을 불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500">
            첫 댓글을 작성해보세요!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
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

                {editingId === comment.id ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleUpdate(comment.id)}
                      className="rounded-lg bg-blue-500 px-3 py-1 text-white"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg bg-gray-200 px-3 py-1"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900">{comment.contents}</p>
                )}

                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  {currentUser?.id === comment.userId && !editingId && (
                    <>
                      <button
                        onClick={() => startEditing(comment)}
                        className="hover:text-gray-900"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="hover:text-gray-900"
                      >
                        삭제
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
