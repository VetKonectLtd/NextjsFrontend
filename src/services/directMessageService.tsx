import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { DIRECT_CHAT } from "@/lib/api-constants";
import { Appointment, ChatMessage } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// any service using hooks
export const directMessageService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useBookAppointment = () => {
		return usePost<{ appointment: Appointment }>(DIRECT_CHAT.APPOINTMENT, {
			onSuccess: (response: any) => {
				handleSuccess(response.message || "Appointment successfully Booked!");
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
		});
	};

	const useSendMessage = () => {
		return usePost<any>(DIRECT_CHAT.SEND_MESSAGE, {
			onSuccess: (response: any) => {
				handleSuccess(response.message);
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
		});
	};

	const useGetSentMessage = (enabled: boolean = false) => {
		return useGet<any>(["sentMessages"], `${DIRECT_CHAT.GET_MESSAGE_SENT_TO}`, {
			enabled,
			staleTime: 0,
		});
	};

	const useGetReceivedMessage = (enabled: boolean = false) => {
		return useGet<any>(
			["receivedMessages"],
			`${DIRECT_CHAT.GET_MESSAGE_RECEIVED_FROM}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetChatList = (enabled: boolean = false) => {
		return useGet<any>(["getChatList"], `${DIRECT_CHAT.GET_CHAT_LIST}`, {
			enabled,
			staleTime: 0,
		});
	};

	const useGetMessage = (enabled: boolean = false, Id: string) => {
		return useGet<ChatMessage>(
			["getMessage"],
			`${DIRECT_CHAT.GET_MESSAGE(Id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetAppointment = (enabled: boolean = false, Id: string) => {
		return useGet<any>(
			["get-Appointment"],
			`${DIRECT_CHAT.GET_APPOINTMENT_BY_ID(Id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetCancelAppointment = (enabled: boolean = false, Id: string) => {
		return useGet<Appointment>(
			["get-Cancel-Appointment"],
			`${DIRECT_CHAT.GET_CANCEL(Id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useUpdateMessage = (Id: string) => {
		return usePut<any>(DIRECT_CHAT.EDIT_MESSAGE(Id), {
			onSuccess: (response: any) => {
				handleSuccess(response.message);
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
		});
	};

    const useGetOrderDetails = ( enabled: boolean = false, url:string) => {
		return useGet<any>(
			["get-Order-Details"],
			url,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useDeleteMessage = (Id: string) => {
		return useDelete<any>(DIRECT_CHAT.DELETE_MESSAGE(Id), {
			onSuccess: (response: any) => {
				handleSuccess(response.message || " Message deleted successfully!");
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
			invalidateQueries: [["messages"]],
		});
	};

	return {
		useBookAppointment,
		useSendMessage,
		useGetSentMessage,
		useGetReceivedMessage,
		useGetChatList,
		useGetMessage,
		useUpdateMessage,
		useDeleteMessage,
		useGetAppointment,
		useGetCancelAppointment,
        useGetOrderDetails,
	};
};
