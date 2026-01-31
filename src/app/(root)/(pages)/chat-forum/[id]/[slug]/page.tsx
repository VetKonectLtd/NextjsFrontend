import PostDetail from "@/components/ChatForum/PostDetails";

export default function ForumDetailPage({
	params,
}: {
	params: { id: string; slug: string };
}) {
	return (
		<div className="max-w-7xl mx-auto px-3 md:px-5 pt-28 pb-20">
			<PostDetail postId={params.id} slug={params.slug} />;
		</div>
	);
}

