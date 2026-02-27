"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ForumChatCard from "@/components/ChatForum/ForumChatCard";
import MyForumChat from "@/components/ChatForum/MyForumChat";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Footer } from "@/components/shared";

const ChatForum = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "forum";

  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`, { scroll: false });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-24 md:pt-28 pb-16 md:pb-20">

          {/* HEADER */}
          <div className="flex flex-col gap-5 mb-6 md:mb-8 md:flex-row md:items-center md:justify-between">
            {/* TEXT */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Community Forum
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Ask questions, share insights and connect with others.
              </p>
            </div>

            {/* ADD POST BUTTON */}
            <Link
              href="/chat-forum/add-chat"
              className="
              group inline-flex items-center justify-center gap-2
              w-full md:w-auto
              bg-accent text-accent-foreground
              px-4 py-3 rounded-xl
              font-medium text-sm
              shadow-md hover:shadow-lg
              transition-all duration-300
              hover:scale-[1.02]
            "
            >
              <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              Add New Post
            </Link>
          </div>

          {/* CARD CONTAINER */}
          <div
            className="
            bg-card/80 backdrop-blur
            border border-border
            rounded-xl md:rounded-2xl
            shadow-sm
            p-3 sm:p-4 md:p-6
          "
          >
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              {/* TAB HEADER */}
              <div className="overflow-x-auto scrollbar-hide">
                <TabsList
                  className="
                  w-max md:w-fit
                  bg-muted
                  rounded-xl p-1
                  mb-5
                  flex gap-2
                "
                >
                  <TabsTrigger
                    value="forum"
                    className="
                    rounded-lg px-4 sm:px-5 py-2 text-sm whitespace-nowrap
                    data-[state=active]:bg-background
                    data-[state=active]:shadow
                    data-[state=active]:text-foreground
                    text-muted-foreground
                    transition
                  "
                  >
                    Forum
                  </TabsTrigger>

                  <TabsTrigger
                    value="mypost"
                    className="
                    rounded-lg px-4 sm:px-5 py-2 text-sm whitespace-nowrap
                    data-[state=active]:bg-background
                    data-[state=active]:shadow
                    data-[state=active]:text-foreground
                    text-muted-foreground
                    transition
                  "
                  >
                    My Posts
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* TAB CONTENT */}
              <TabsContent value="forum" className="mt-2">
                <ForumChatCard />
              </TabsContent>

              <TabsContent value="mypost" className="mt-2">
                <MyForumChat />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatForum;
