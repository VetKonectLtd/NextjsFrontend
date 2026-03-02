
import ForumChatForm from "@/components/ChatForum/ForumChatForm";
import { useForumService } from "@/services/forumService";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit Forum Post",
	description: "Edit your forum post and update its content.",
};

const EditForum=({ params }: { params: { slug: string }})=> {
        const { useGetForumSlug } = useForumService();
        const chatData:any = useGetForumSlug(true, params.slug);
        
  return <ForumChatForm mode="edit" chat={chatData.data} />;
}

export default EditForum;