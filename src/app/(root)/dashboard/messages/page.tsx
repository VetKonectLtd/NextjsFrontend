
import DirectMessage from "@/components/message/DirectMessage";
import React from "react";

const MessagesPage = () => {
	return (
		<div className="w-11/12 m-auto bg-white">
			<div className="font-bold text-lg mb-6">Messages</div>
			<DirectMessage/>
		</div>
	);
};

export default MessagesPage;
