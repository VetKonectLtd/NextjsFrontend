import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { FORUM_CHAT } from "@/lib/api-constants";
import { ForumChat } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import page from "@/app/(root)/dashboard/ad-promotion/page";

// PetOwner service using hooks
export const useForumService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useAddForum = () => {
		return usePost<{ forum: ForumChat; token: string }, ForumChat>(
			FORUM_CHAT.FORUM_STORE,
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || "Forum added successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useAddForumComment = (id: string) => {
		return usePost<{ forum: any }>(FORUM_CHAT.ADD_FORUM_COMMENT(id), {
			onSuccess: () => { },
			onError: (error) => {
				handleError(error.message || "failed");
			},
		});
	};

	const useLikeForum = (id: string) => {
		return usePost<{ forum: ForumChat }, ForumChat>(FORUM_CHAT.LIKE_FORUM(id), {
			onSuccess: (response: any) => { },
			onError: (error) => {
				handleError(error.message || "failed");
			},
			invalidateQueries: [["forum", page.toString()]],
		});
	};

	const useGetTrendingForum = (enabled: boolean = false) => {
		return useGet<{ forum: ForumChat; token: string }>(
			["trending_forum"],
			`${FORUM_CHAT.TRENDING_FORUM}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetForumByVisibility = (
		enabled: boolean = false,
		visibility: string,
	) => {
		return useGet<{ forum: ForumChat }>(
			["forum_visibility"],
			`${FORUM_CHAT.GET_VISIBILITY_OPTIONS(visibility)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetForumCommentById = (enabled: boolean = false, id: string) => {
		return useGet<{ forum: ForumChat }>(
			["forum_comment"],
			`${FORUM_CHAT.GET_FORUM_COMMENTS(id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetAllForumChat = (enabled: boolean = false, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());

		const url = `${FORUM_CHAT.GET_ALL_FORUM}?${queryParams.toString()}`;

		return useGet<{ forum: ForumChat }>(["forum", page.toString()], url, {
			enabled,
			staleTime: 0,
		});
	};

	const useGetUserForum = (enabled: boolean = false, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());

		const url = `${FORUM_CHAT.GET_USER_FORUM}?${queryParams.toString()}`;
		return useGet<{ forum: ForumChat }>(
			["user_forum", page.toString()],
			url,
			{
				enabled,
				staleTime: 0,
			},
		);
	}

	const useGetShareForum = (enabled: boolean = false, id: string) => {
		return useGet<{ forum: ForumChat; token: string }>(
			["share_forum"],
			`${FORUM_CHAT.SHARE_FORUM(id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetForumSlug = (enabled: boolean = false, slug: string) => {
		return useGet<{ forum: ForumChat }>(
			["getForumSlug"],
			`${FORUM_CHAT.FORUM_SLUG(slug)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useUpdateForum = (id: string) => {
		return usePost<{ forum: ForumChat; token: string }, ForumChat>(
			FORUM_CHAT.UPDATE_FORUM(id),
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || "Forum updated successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useUpdateForumComment = (id: string) => {
		return usePut<{ forum: any }>(FORUM_CHAT.UPDATE_FORUM_COMMENT(id), {
			onSuccess: (response: any) => {
				handleSuccess(
					response.message || "Changes to your Comment have been saved",
				);
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
		});
	};

	const useDeleteForumComment = (id: string) => {
		return useDelete<ForumChat>(FORUM_CHAT.DELETE_FORUM_COMMENT(id), {
			onSuccess: (response: any) => {
				handleSuccess(response.message || "Forum deleted successfully!");
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
			invalidateQueries: [["forum"]],
		});
	};

	const useDeleteForum = (id: string) => {
		return useDelete<ForumChat>(FORUM_CHAT.DELETE_FORUM(id), {
			onSuccess: (response: any) => {
				handleSuccess(response.message || "Forum deleted successfully!");
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
			invalidateQueries: [["forum"]],
		});
	};

	const getForumPreviewBySlug = async (slug: string) => {
		const res = await fetch(
			`${process.env.API_URL}${FORUM_CHAT.FORUM_SLUG(slug)}`,
			{
				cache: "no-store",
				headers: {
					Accept: "application/json",
				},
			}
		);

		if (!res.ok) return null;

		const data = await res.json();

		const forum = data?.forum ?? data;

		return {
			title: forum.title,
			excerpt: forum.content
				? forum.content.slice(0, 140) + "..."
				: "Join the discussion",
			image_url: forum.image_url || null,
		};
	}


	return {
		useDeleteForum,
		useUpdateForum,
		useGetForumCommentById,
		useAddForumComment,
		useAddForum,
		useGetShareForum,
		useGetForumSlug,
		useGetUserForum,
		useGetForumByVisibility,
		useGetTrendingForum,
		useLikeForum,
		useGetAllForumChat,
		useDeleteForumComment,
		useUpdateForumComment,
		getForumPreviewBySlug,
	};
};
