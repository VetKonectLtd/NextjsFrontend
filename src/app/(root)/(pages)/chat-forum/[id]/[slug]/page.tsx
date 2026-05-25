import PostDetail from "@/components/ChatForum/PostDetails";
import { Metadata } from "next";

async function getForumPostData(id: string, slug: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v3/forums/chat/${slug}/slug`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data?.data || data?.post || data?.forum || data || null;
  } catch (error) {
    console.error("Error fetching forum post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string };
}): Promise<Metadata> {
  const { id, slug } = params;

  const post = await getForumPostData(id, slug);

  if (!post) {
    return {
      title: "Forum Post Not Found | Vet Konect",
      description:
        "The requested forum post could not be found or may have been removed.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const plainTextContent = post.content?.replace(/<[^>]*>/g, "") || "";
  const description =
    plainTextContent.substring(0, 160) +
    (plainTextContent.length > 160 ? "..." : "");

  return {
    title: `${post.title}`,
    description:
      description || "Join the discussion on this forum post at Vet Konect.",
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      images: [
        {
          url: post.image_url || "",
        },
      ],
      url: `https://www.vetkonect.com/forum/${id}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [post.image_url || ""],
    },
    keywords: ["forum", "discussion", "veterinary"].join(", "),
  };
}

export default async function ForumDetailPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const { id, slug } = params;

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-5 pt-28 pb-20">
      <PostDetail postId={id} slug={slug} />
    </div>
  );
}
