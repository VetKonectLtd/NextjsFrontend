import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { BLOG, BLOG_COMMENTS } from "@/lib/api-constants";
import { Comment, ReportComment } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// any service using hooks
export const useBlogService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useToggleBlogLike = (Id: string) => {
		return usePost<{ blog:any; token: string }, any>(
			BLOG.TOGGLE_BLOG_LIKE(Id),
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message);
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useAddComment = (Id: string) => {
		return usePost<{ comment: Comment; token: string }, Comment>(
			BLOG_COMMENTS.ADD_COMMENT(Id),
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message);
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useGetComments = (enabled: boolean = false, Id: string) => {
		return useGet<{ comment: Comment; token: string }>(
			["comments"],
			`${BLOG_COMMENTS.GET_COMMENTS(Id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useUpdateComment = (Id: string) => {
		return usePut<{ comment: Comment; token: string }, Comment>(
			BLOG_COMMENTS.UPDATE_COMMENT(Id),
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message);
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useDeleteComment = (Id: string) => {
		return useDelete<Comment>(BLOG_COMMENTS.DELETE_COMMENT(Id), {
			onSuccess: (response: any) => {
				handleSuccess(response.message || " Comment deleted successfully!");
			},
			onError: (error) => {
				handleError(error.message || "failed");
			}
		});
	};

	const useReportComment = (Id: string) => {
		return usePut<{ flag: ReportComment;}>(
			BLOG_COMMENTS.REPORT_COMMENT(Id),
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message);
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useGetAllBlog = (enabled: boolean = false) => {
		return useGet<{ blog: any; token: string }>(
			["allBlog"],
			`${BLOG.GET_ALL_BLOGS}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetBlog = (enabled: boolean = false, id:string) => {
		return useGet<{ blog: any; }>(["blog"], `${BLOG.BLOG(id)}`, {
			enabled,
			staleTime: 0,
		});
	};

	const useGetShareBlog = (enabled: boolean = false) => {
		return useGet<{ blog: any; token: string }>(
			["shareBlog"],
			`${BLOG.SHARE_BLOG}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetBlogSlug = (enabled: boolean = false) => {
		return useGet<{ blog: any; token: string }>(
			["blogSlug"],
			`${BLOG.BLOGS_SLUG}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetTrendingBlog = (enabled: boolean = false) => {
		return useGet<{ blog: any; token: string }>(
			["trendingBlog"],
			`${BLOG.TRENDING_BLOGS}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	return {
		useToggleBlogLike,
		useGetAllBlog,
		useGetBlog,
		useGetBlogSlug,
		useGetTrendingBlog,
		useGetShareBlog,
		useAddComment,
		useGetComments,
		useUpdateComment,
		useDeleteComment,
		useReportComment,
	};
};
