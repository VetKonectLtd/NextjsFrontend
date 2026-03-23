
import ForumChatForm from "@/components/ChatForum/ForumChatForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "New Forum Post",
	description: "Create a new forum post and share your thoughts with the community.",
	openGraph: {
		title: "New Forum Post | Vet Konect",
		description: "Create a new forum post and share your thoughts with the community.",
		url: "https://www.vetkonect.com/chat-forum/new",
		images: [{ url: "https://www.vetkonect.com/images/og-logo.png" }],
		type: "website",
	},
	twitter: {
		card: 'summary_large_image',
		title: "New Forum Post | Vet Konect",
		description: "Create a new forum post and share your thoughts with the community.",
		images: [`https://www.vetkonect.com/images/og-logo.png`],
	},
};

export default function NewChatPage() {

  return <ForumChatForm mode="create" />;

}