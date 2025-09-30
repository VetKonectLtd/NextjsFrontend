import { usePost, useGet,  useDelete, usePut } from "@/lib/hooks";
import { FORUM_CHAT } from "@/lib/api-constants";
import { LiveStock } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// PetOwner service using hooks
export const useForumService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    
    const useAddForum = () => {
        return usePost<{ livestock: LiveStock; token: string }, LiveStock>(
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

    const useLikeForum = (id: string) => {
        return usePost<{ livestock: LiveStock; token: string }, LiveStock>(
            FORUM_CHAT.LIKE_FORUM(id),
            {
                onSuccess: (response: any) => {

                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    
    const useGetTrendingForum = (enabled: boolean = false) => {
        return useGet<{ livestock: LiveStock; token: string }>(
            ["trending_forum"],
            `${FORUM_CHAT.TRENDING_FORUM}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useGetShareForum = (enabled: boolean = false) => {
        return useGet<{ livestock: LiveStock; token: string }>(
            ["share_forum"],
            `${FORUM_CHAT.SHARE_FORUM}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useGetForumSlug = (enabled: boolean = false, id: string) => {
        return useGet<{ livestock: LiveStock; token: string }>(
            ["getForumSlug", id],
            `${FORUM_CHAT.FORUM_SLUG(id)}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useUpdateForum = (id: string) => {
        return usePost<{ livestock: LiveStock; token: string }, LiveStock>(
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

    
    const useDeleteForum = (id: string) => {
        return useDelete<LiveStock>(FORUM_CHAT.DELETE_FORUM(id), {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Forum deleted successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
                invalidateQueries: [["forum"]],
            },);
    };

    return {
        useDeleteForum,
        useUpdateForum,
        useAddForum,
        useGetShareForum,
        useGetForumSlug,
        useGetTrendingForum,
        useLikeForum
    };
};
