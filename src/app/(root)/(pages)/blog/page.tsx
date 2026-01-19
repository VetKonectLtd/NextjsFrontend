"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, MessagesSquare, Search, Share2, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBlogService } from "@/services/blogServie";
import { BlogChat } from "@/types";
import { timeAgo } from "@/components/shared/TimeFormat";

export default function BlogIndexPage() {
    const router = useRouter();
    const { useGetAllBlog } = useBlogService();
    const { data, isLoading } = useGetAllBlog(true);

    const blogPosts: BlogChat[] = Array.isArray(data?.data) ? data.data : [];
    const [search, setSearch] = useState("");

    const filteredBlogs = blogPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-20">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Vet Konect Blog</h1>
                <p className="text-gray-500 mt-2">
                    Latest insights on animal health, veterinary practice & innovation
                </p>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-12">
                <div className="flex items-center border rounded-xl overflow-hidden shadow-sm">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search articles..."
                        className="flex-1 px-4 py-3 outline-none"
                    />
                    <div className="px-4">
                        <Search className="w-5 h-5 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="text-center py-20 text-gray-500">
                    Loading articles...
                </div>
            )}

            {/* Empty */}
            {!isLoading && filteredBlogs.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No blog posts found.
                </div>
            )}

            {/* Blog Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((post) => (
                    <article
                        key={post.id}
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="cursor-pointer relative bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                    >
                        {/* Image */}
                        <div className="relative h-48 w-full">
                            {post?.picture_url ? (
                                <Image
                                    src={post?.picture_url}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-primary-400" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h2 className="font-semibold text-lg text-gray-800 line-clamp-2">
                                {post.title}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                By {post.author.name} • {timeAgo(post.created_at)}
                            </p>

                            <p
                                className="text-gray-600 text-sm mt-3 mb-8 line-clamp-3"
                                dangerouslySetInnerHTML={{
                                    __html: post.content.slice(0, 120) + "...",
                                }}
                            />

                            {/* Stats */}
                            <div className="flex gap-4 items-center absolute bottom-3 text-sm justify-between mt-4 pt-4">
                                <div className="flex items-center">
                                    <span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
                                        <Eye size={14} color="#1D2432" />
                                    </span>
                                    <span className="ml-1 flex gap-2 md:text-sm text-xs text-gray-55 font-medium">
                                        {post.views_count}{" "}
                                        <span className="hidden md:block">Views</span>
                                    </span>
                                </div>
                                <div
                                    className="flex items-center"
                                >
                                    <span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
                                        <MessagesSquare size={14} color="#1D2432" />
                                    </span>
                                    <span className="ml-1 flex gap-2 md:text-sm text-xs text-gray-55 font-medium">
                                        {post?.comments_count}
                                        <span className="hidden md:block">Comments</span>
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span
                                        className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
                                    >
                                        <ThumbsUp
                                            size={14}
                                            color={
                                                post.has_liked ? "#0BA02C" : "#1D2432"
                                            }
                                            fill={post.has_liked ? "#0BA02C" : "none"}
                                        />
                                    </span>
                                    <span className="ml-1 flex gap-2 text-sm text-gray-55 font-medium">
                                        {post?.likes_count}
                                        <span className="hidden md:block">Likes</span>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
