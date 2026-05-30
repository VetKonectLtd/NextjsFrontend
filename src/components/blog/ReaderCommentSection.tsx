"use client";

import Image from "next/image";
import { Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useBlogService } from "@/services/blogServie";
import { timeAgo } from "@/components/shared/TimeFormat";
import { User } from "@/app/assets/icons";
import CommentMenu from "@/components/blog/CommentMenu";

const DEFAULT_AVATAR = User;

export default function ReaderCommentSection({ id }: { id: string }) {
  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState<string | " ">("");
  const [editingCommentId, setEditingCommentId] = useState<string | "">("");
  const [replyToId, setReplyToId] = useState<string | " ">("");
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [openReplies, setOpenReplies] = useState<string | null>(null);
  const {
    useAddComment,
    useDeleteComment,
    useReportComment,
    useUpdateComment,
    useGetComments,
    useGetAllBlog,
    useGetBlog,
  } = useBlogService();

  const deleteCommentMutation = useDeleteComment(commentId);
  const getBlog = useGetBlog(true, id);
  const reportComment = useReportComment(commentId);
  const updateCommentMutation = useUpdateComment(editingCommentId);
  const blogCommentMutation = useAddComment(id);
  const getComment = useGetComments(true, id);
  const getAllBlog = useGetAllBlog(true);

  const comments: any = getComment.data || [];

  const handleCancel = () => {
    setCommentText("");
    setEditingCommentId("");
    setReplyToId("");
  };

  const handleDelete = (commentid: any) => {
    setCommentId(commentid);

    if (window.confirm(`Are you sure you want to delete your comment?`)) {
      deleteCommentMutation.mutate(commentid, {
        onSuccess: () => {
          getComment.refetch();
          getAllBlog.refetch();
          getBlog.refetch();
        },
      });
    }
  };

  const handleFlag = (commentId: any) => {
    setCommentId(commentId);

    const choice = window.prompt(
      "Why are you reporting this comment? Type 'spam' or 'abuse'",
    );

    if (choice === "spam" || choice === "abuse") {
      if (
        window.confirm(
          `Are you sure you want to report this comment as ${choice}?`,
        )
      ) {
        reportComment.mutate(
          { flag: choice }, // ✅ only "spam" or "abuse"
          {
            onSuccess: () => {
              getComment.refetch();
              getAllBlog.refetch();
              getBlog.refetch();
            },
          },
        );
      }
    } else {
      alert("Invalid choice. Please type either 'spam' or 'abuse'.");
    }
  };

  const handleEdit = (comment: any) => {
    setEditingCommentId(comment.id);
    setCommentText(comment.comment);
    setTimeout(() => {
      commentInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      commentInputRef.current?.focus();
    }, 200);
  };

  const handleReply = (comment: any) => {
    setReplyToId(comment.id);
    setCommentText("");
    setTimeout(() => {
      commentInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      commentInputRef.current?.focus();
    }, 200);
  };

  const handleSubmit = () => {
    if (replyToId) {
      blogCommentMutation.mutate(
        { comment: commentText, parent_id: replyToId },
        {
          onSuccess: () => {
            setCommentText("");
            setReplyToId("");
            getComment.refetch();
            getBlog.refetch();
          },
        },
      );
    } else if (editingCommentId) {
      updateCommentMutation.mutate(
        { comment: commentText },
        {
          onSuccess: () => {
            setCommentText("");
            setEditingCommentId("");
            getComment.refetch();
            getBlog.refetch();
          },
        },
      );
    } else {
      blogCommentMutation.mutate(
        { comment: commentText },
        {
          onSuccess: () => {
            setCommentText("");
            getComment.refetch();
            getBlog.refetch();
          },
        },
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-16">
      {/* Header */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment */}
      <div className="flex items-start gap-3 mb-10">
        <div className="w-10 h-10 rounded-full border overflow-hidden">
          <Image
            src={DEFAULT_AVATAR}
            alt="Current user avatar for blog comment"
            width={40}
            height={40}
          />
        </div>

        <div className="flex-1 bg-gray-50 border rounded-xl px-4 py-3">
          <div className="flex items-center">
            <textarea
              ref={commentInputRef}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Join the discussion..."
              rows={3}
              className="w-full resize-none bg-transparent outline-none text-sm"
            />
            {(editingCommentId || replyToId) && (
              <button
                onClick={handleCancel}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Cancel"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-primary-400 text-white text-sm rounded-lg hover:bg-primary-500 transition"
            >
              <Send className="w-4 h-4" />
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-8">
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">
            Be the first to comment on this article.
          </p>
        )}

        {comments.map((c: any) => (
          <div key={c.id} className="flex gap-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full border overflow-hidden">
              <Image
                src={c.author.image || DEFAULT_AVATAR}
                alt={c.author.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>

            {/* Body */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {c.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {timeAgo(c.created_at)}
                  </p>
                </div>

                <CommentMenu
                  handleEdit={() => handleEdit(c)}
                  handleReply={() => handleReply(c)}
                  handleDelete={() => handleDelete(c.id)}
                  handleFlag={() => handleFlag(c.id)}
                />
              </div>

              <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                {c.comment}
              </p>

              <span
                onClick={() =>
                  setOpenReplies(openReplies === c.id ? null : c.id)
                }
                className="ml-1 text-xs text-gray-55 font-medium cursor-pointer hover:underline"
              >
                {openReplies === c.id
                  ? "Hide comments"
                  : c?.replies?.length < 1
                    ? ""
                    : `${c?.replies?.length} reply`}
              </span>

              {openReplies === c.id && c.replies?.length > 0
                ? c.replies.map((reply: any) => (
                    <div key={reply.id} className="mt-2 ml-12 pb-2">
                      <div className="flex justify-between">
                        {/* Left side */}
                        <div className="flex w-full mb-1 items-center gap-2">
                          <div className="w-8 h-8 rounded-full border border-gray-225 overflow-hidden">
                            <Image
                              src={reply.author.image || DEFAULT_AVATAR}
                              alt={reply.name}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex items-start text-left flex-col text-gray-55">
                            <p className="text-sm font-semibold">
                              {reply.author.name}
                            </p>
                            <p className="text-xs text-gray-55">
                              {timeAgo(reply?.created_at)}
                            </p>
                          </div>
                        </div>

                        <CommentMenu
                          handleEdit={() => handleEdit(reply)}
                          handleReply={() => handleReply(c)}
                          handleDelete={() => handleDelete(reply.id)}
                          handleFlag={() => handleFlag(reply.id)}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{reply.comment}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
