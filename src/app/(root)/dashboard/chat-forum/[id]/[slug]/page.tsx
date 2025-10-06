import PostDetail from "@/components/ChatForum/PostDetails";

export default function ForumDetailPage({
	params,
}: {
	params: { id: string; slug: string };
}) {
	return (
		<div className="w-11/12 mt-3 m-auto">
			<PostDetail postId={params.id} slug={params.slug} />;
		</div>
	);
}
