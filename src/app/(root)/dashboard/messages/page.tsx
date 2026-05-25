import DirectMessage from "@/components/message/DirectMessage";
import React from "react";

const MessagesPage = () => {
  return (
    <div className="md:w-11/12 m-auto bg-white">
      <div className="font-bold md:text-lg md:ml-0 ml-5 text-xl md:mb-6 mb-3">
        Messages
      </div>
      <DirectMessage />
    </div>
  );
};

export default MessagesPage;
