"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, MessagesSquare, Search, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBlogService } from "@/services/blogServie";
import { BlogChat } from "@/types";
import { timeAgo } from "@/components/shared/TimeFormat";
import BlogIndexSkeleton from "@/components/blog/BlogIndexSkeleton";
import Footer from "@/components/shared/Footer";

// Helper function to strip HTML tags for preview text
const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
};

export default function BlogIndexClient() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [allBlog, setAllBlog] = useState<BlogChat[]>([]);
    const { useGetAllBlog } = useBlogService();
    const { data, isLoading } = useGetAllBlog(true, page);

    const blogPosts = data?.data ?? [];
    const [search, setSearch] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState<BlogChat[]>([]);

    // Combine posts as pages load
    useEffect(() => {
        if ((data as any)?.data) {
            setAllBlog((prev) => {
                const newBlogPosts = (data as any)?.data.filter(
                    (p: BlogChat) => !prev.some((old) => old.id === p.id),
                );
                return [...prev, ...newBlogPosts];
            });
        }
    }, [data]);

    // Update filtered blogs when blogPosts or search changes
    useEffect(() => {
        const filtered = allBlog.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredBlogs(filtered);
    }, [allBlog, search]);

    // Optional: Update document title when data loads
    useEffect(() => {
        if (allBlog.length > 0) {
            document.title = `Blog (${allBlog.length} articles) | Vet Konect`;
        }
    }, [blogPosts]);

    // Handle search with debounce for better performance
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleLoadMore = () => {
        const nextPage = (data as any)?.next_page_url;
        if (nextPage) setPage((prev) => prev + 1);
    };

    return (
        <>
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
                            onChange={handleSearch}
                            placeholder="Search articles..."
                            className="flex-1 px-4 py-3 outline-none"
                            aria-label="Search blog articles"
                        />
                        <div className="px-4">
                            <Search className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>

                    {/* Search results count */}
                    {!isLoading && allBlog.length > 0 && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Found {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
                            {search && ` matching "${search}"`}
                        </p>
                    )}
                </div>

                {/* Loading */}
                {isLoading && <BlogIndexSkeleton />}

                {/* Empty */}
                {!isLoading && filteredBlogs.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        {search ? (
                            <>
                                <p className="text-lg">No articles found for "{search}"</p>
                                <button
                                    onClick={() => setSearch("")}
                                    className="mt-4 text-primary-400 hover:text-primary-600 underline"
                                >
                                    Clear search
                                </button>
                            </>
                        ) : (
                            <p className="text-lg">No blog posts found.</p>
                        )}
                    </div>
                )}

                {/* Blog Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBlogs.map((post) => {
                        // Create clean preview text without HTML
                        const plainText = stripHtmlTags(post.content);
                        const previewText = plainText.slice(0, 120) + (plainText.length > 120 ? '...' : '');

                        return (
                            <article
                                key={post.id}
                                onClick={() => router.push(`/blog/${post.slug}`)}
                                className="cursor-pointer relative bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group"
                                aria-label={`Read article: ${post.title}`}
                            >
                                {/* Image with hover effect */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    {post?.picture_url ? (
                                        <Image
                                            src={post?.picture_url}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-primary-400 to-primary-600 group-hover:opacity-90 transition" />
                                    )}

                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h2 className="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-primary-600 transition">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        By {post.author.name} • {timeAgo(post.created_at)}
                                    </p>

                                    <p className="text-gray-600 text-sm mt-3 mb-12 line-clamp-2">
                                        {previewText}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex gap-4 items-center absolute bottom-4 text-sm justify-start mt-4 pt-2">
                                        <div className="flex items-center" title={`${post.views_count} views`}>
                                            <span className="bg-white border border-gray-200 shadow-sm rounded-full p-1.5 flex items-center justify-center">
                                                <Eye size={14} color="#1D2432" />
                                            </span>
                                            <span className="ml-1 text-xs text-gray-55 font-medium">
                                                {post.views_count}
                                            </span>
                                        </div>

                                        <div className="flex items-center" title={`${post.comments_count} comments`}>
                                            <span className="bg-white border border-gray-200 shadow-sm rounded-full p-1.5 flex items-center justify-center">
                                                <MessagesSquare size={14} color="#1D2432" />
                                            </span>
                                            <span className="ml-1 text-xs text-gray-55 font-medium">
                                                {post?.comments_count}
                                            </span>
                                        </div>

                                        <div className="flex items-center" title={`${post.likes_count} likes`}>
                                            <span className="bg-white border border-gray-200 shadow-sm rounded-full p-1.5 flex items-center justify-center">
                                                <ThumbsUp
                                                    size={14}
                                                    color={post.has_liked ? "#0BA02C" : "#1D2432"}
                                                    fill={post.has_liked ? "#0BA02C" : "none"}
                                                />
                                            </span>
                                            <span className="ml-1 text-xs text-gray-55 font-medium">
                                                {post?.likes_count}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Load more button (optional - if you implement pagination) */}
                {!isLoading && (data as any)?.next_page_url && (
                    <div className="text-center mt-12">
                        <button onClick={handleLoadMore} className="px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-600 transition">
                            Load More Articles
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}