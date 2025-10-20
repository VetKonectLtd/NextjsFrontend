"use client";
import { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import VetDetails from "./VetDetails";
import { Vet1, Vet2, Vet3, Vet4 } from "@/app/assets/images";
import { directMessageService } from "@/services/directMessageService";

export default function DirectMessage() {

  const {useGetChatList} = directMessageService();

  const getChatList = useGetChatList(true);
   
  const messages:any = getChatList.data || [];
  // [
  //   { id: 1, name: "Dolapo Adaba", text: "I need a vet", avatar: Vet1, role: "Veterinarian", location: "Lagos" },
  //   { id: 2, name: "Paul Huston", text: "Need help", avatar: Vet2, role: "Pet Doctor", location: "Abuja" },
  //   { id: 3, name: "Kristine Joel", text: "Animal Surgeon", avatar: Vet3, role: "Surgeon", location: "PH" },
  //   { id: 4, name: "Dority Hanger", text: "Nutritionist", avatar: Vet4, role: "Nutritionist", location: "Enugu" },
  // ];

  const [selectedVet, setSelectedVet] = useState<any | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState("product");

  const handleContact = (id: string, type: string) => setSelectedAction(type);

  return (
    <div className="px-4">
      {/* GRID LAYOUT FOR DESKTOP */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        <ChatList
          messages={messages}
          selectedVet={selectedVet}
          onSelectVet={(vet) => setSelectedVet(vet)}
        />
        <ChatWindow
          selectedVet={selectedVet}
          message={message}
          onBack={() => {}}
          onMessageChange={setMessage}
          onOpenVetDetails={() => {}}
        />
        <VetDetails
          selectedVet={selectedVet}
          selectedAction={selectedAction}
          onBack={() => {}}
          handleContact={handleContact}
        />
      </div>

      {/* RESPONSIVE MOBILE VIEW */}
      <div className="md:hidden flex flex-col">
        {/* Chat List (default view) */}
        {!showChat && !showDetails && (
          <ChatList
            messages={messages}
            selectedVet={selectedVet}
            onSelectVet={(vet) => {
              setSelectedVet(vet);
              setShowChat(true);
            }}
          />
        )}

        {/* Chat Window (middle card) */}
        {showChat && !showDetails && (
          <ChatWindow
            selectedVet={selectedVet}
            message={message}
            onBack={() => setShowChat(false)}
            onMessageChange={setMessage}
            onOpenVetDetails={() => setShowDetails(true)}
          />
        )}

        {/* Vet Details (right card) */}
        {showDetails && (
          <VetDetails
            selectedVet={selectedVet}
            selectedAction={selectedAction}
            onBack={() => setShowDetails(false)}
            handleContact={handleContact}
          />
        )}
      </div>
    </div>
  );
}
