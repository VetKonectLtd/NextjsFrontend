
import ForumChatForm from "@/components/ChatForum/ForumChatForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "New Forum Post",
	description: "Create a new forum post and share your thoughts with the community.",
};

export default function NewChatPage() {

  return <ForumChatForm mode="create" />;

}