import { Metadata } from "next";
import BlogReaderClient from "./BlogReaderClient";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Server-side metadata generation
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch blog data on the server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v3/blogs/slug/${slug}/slug`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const data = await response.json();
    const activePost = data?.original || null;

    return {
      title: activePost?.blog?.title || "Blog Post",
      description: activePost?.blog?.content
        ? activePost.blog.content.replace(/<[^>]*>/g, "").substring(0, 160) +
          "..."
        : "Read this insightful blog post on Vet Konect.",
      openGraph: {
        title: activePost?.blog?.title,
        description: activePost?.blog?.content
          ? activePost.blog.content.replace(/<[^>]*>/g, "").substring(0, 160) +
            "..."
          : undefined,
        url: `https://www.vetkonect.com/blog/${slug}`,
        images: [
          {
            url: activePost?.blog?.picture_url || "",
          },
        ],
        publishedTime: activePost?.blog?.created_at,
        authors: [activePost?.blog?.author?.name],
      },
      twitter: {
        card: "summary_large_image",
        title: activePost?.blog?.title,
        description: activePost?.blog?.content
          ? activePost.blog.content.replace(/<[^>]*>/g, "").substring(0, 160) +
            "..."
          : undefined,
        images: [
          {
            url: activePost?.blog?.picture_url || "",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Read this insightful blog post on Vet Konect.",
    };
  }
}

export default async function BlogReaderPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogReaderClient slug={slug} />;
}
