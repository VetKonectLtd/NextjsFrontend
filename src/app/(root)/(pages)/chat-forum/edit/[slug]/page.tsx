
import ForumChatForm from "@/components/ChatForum/ForumChatForm";
import { useForumService } from "@/services/forumService";
import { Metadata } from "next";

const baseUrl = 'https://www.vetkonect.com';

export const metadata: Metadata = {
	title: "Edit Forum Post",
	description: "Edit your forum post and update its content.",
  openGraph: {
    title: "Edit Forum Post | Vet Konect",
    description: "Edit your forum post and update its content.",
    url: "https://www.vetkonect.com/chat-forum/edit",
    images: [{ url: `${baseUrl}/images/og-logo.png` }],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Edit Forum Post | Vet Konect",
    description: "Edit your forum post and update its content.",
    images: [`${baseUrl}/images/og-logo.png`],
  },
};

const EditForum=({ params }: { params: { slug: string }})=> {
        const { useGetForumSlug } = useForumService();
        const chatData:any = useGetForumSlug(true, params.slug);
        
  return <ForumChatForm mode="edit" chat={chatData.data} />;
}

export default EditForum;