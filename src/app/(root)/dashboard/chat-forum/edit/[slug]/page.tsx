"use client";
import ForumChatForm from "@/components/ChatForum/ForumChatForm";
import { useForumService } from "@/services/forumService";

const EditForum=({ params }: { params: { slug: string }})=> {
        const { useGetForumSlug } = useForumService();
        const chatData:any = useGetForumSlug(true, params.slug);
        
  return <ForumChatForm mode="edit" chat={chatData.data} />;
}

export default EditForum;