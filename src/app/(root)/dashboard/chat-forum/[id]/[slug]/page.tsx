import PostDetail from "@/components/ChatForum/PostDetails";
import { Metadata } from "next";
import { useForumService } from "@/services/forumService";

type Props = {
	params: { id: string; slug: string };
};

export async function generateMetadata(
	{ params }: Props
): Promise<Metadata> {
	const { getForumPreviewBySlug } = useForumService();
	const forum = await getForumPreviewBySlug(params.slug);

	if (!forum) {
		return {
			title: "Forum Discussion",
			description: "Join the discussion",
		};
	}

	return {
		title: forum.title,
		description: forum.excerpt,
		openGraph: {
			title: forum.title,
			description: forum.excerpt,
			type: "article",
			images: forum.image_url
				? [
					{
						url: forum.image_url,
						width: 1200,
						height: 630,
					},
				]
				: [],
		},
	};
}

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

