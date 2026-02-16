import { usePost, useGet,  useDelete, usePut } from "@/lib/hooks";
import { Leaderboard, INVITATIONS } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// PetOwner service using hooks
export const useInviteService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    
    const useSendInvite = () => {
        return usePost<any>(
            INVITATIONS.SEND_INVITE,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Invite sent successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed to send invite");
                },
            },
        );
    };



    const useGetOverallLeaderBoard = (enabled: boolean = false) => {
        return useGet<any>(
            ["leaderboard"],
            `${Leaderboard.GET_LEADERBOARD}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useGetUserPoints = (enabled: boolean = false) => {
        return useGet<any>(
            ["userPoints"],
            `${INVITATIONS.GET_USER_POINTS}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    }

    return {
        useSendInvite,
        useGetOverallLeaderBoard,
        useGetUserPoints,
    };

};
