"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Download, Eye, MessagesSquare, Share2, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlogService } from "@/services/blogServie";
import { timeAgo } from "@/components/shared/TimeFormat";
import ShareModal from "@/components/ChatForum/ShareModal";
import ReaderCommentSection from "@/components/blog/ReaderCommentSection";
import BlogReaderSkeleton from "@/components/blog/BlogReaderSkeleton";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function BlogReaderPage() {
  const { slug } = useParams();
  const [shareOpen, setShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const router = useRouter();
  const pdfOnlyRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);


  const { useGetBlogSlug, useToggleBlogLike } = useBlogService();
  const getSlugData = useGetBlogSlug(true, slug as string);

  const activePost = (getSlugData?.data as any)?.original || null;

  const likeBlogMutation = useToggleBlogLike(activePost?.blog?.id);


  /* ---------------------------------------------
     Increment like
  ----------------------------------------------*/

  const handleLike = (Id: any) => {
    likeBlogMutation.mutate(Id, {
      onSuccess: () => {
        getSlugData.refetch();
      },
    });
  };

  /* ---------------------------------------------
     States
  ----------------------------------------------*/
  if (getSlugData.isLoading) {
    return (
      <BlogReaderSkeleton />
    );
  }

const handleDownloadPDF = async () => {
  if (!pdfOnlyRef.current) return;

  setIsDownloading(true);

  const element = pdfOnlyRef.current;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const marginTop = 15;
  const marginBottom = 20;
  const marginLeft = 15;

  const usableWidth = pageWidth - marginLeft * 2;
  const usableHeight = pageHeight - marginTop - marginBottom;

  // Convert PDF mm → canvas px ratio
  const pxPerMm = canvas.width / usableWidth;
  const pageHeightPx = usableHeight * pxPerMm;

  let currentY = 0;
  let pageIndex = 0;

  while (currentY < canvas.height) {
    const pageCanvas = document.createElement("canvas");
    const pageContext = pageCanvas.getContext("2d")!;

    pageCanvas.width = canvas.width;
    pageCanvas.height = Math.min(pageHeightPx, canvas.height - currentY);

    pageContext.drawImage(
      canvas,
      0,
      currentY, // source y
      canvas.width,
      pageCanvas.height, // source height
      0,
      0,
      canvas.width,
      pageCanvas.height
    );

    const pageImgData = pageCanvas.toDataURL("image/png");

    if (pageIndex > 0) pdf.addPage();

    const pageImgHeight =
      (pageCanvas.height * usableWidth) / pageCanvas.width;

    pdf.addImage(
      pageImgData,
      "PNG",
      marginLeft,
      marginTop,
      usableWidth,
      pageImgHeight
    );

    currentY += pageHeightPx;
    pageIndex++;
  }

  pdf.save(`${activePost.blog.title}.pdf`);

  setIsDownloading(false);
};



  /* ---------------------------------------------
     Render
  ----------------------------------------------*/
  return (

    <>

      {/* ================= PDF ONLY LAYOUT (HIDDEN) ================= */}
      <div className="absolute -left-[9999px] top-0">
        <div
          ref={pdfOnlyRef}
          className="w-[800px] bg-white p-5 pb-10"
        >
          {/* Title */}
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            {activePost?.blog.title}
          </h1>

          {/* Image */}
          {activePost.blog.picture_url && (
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-10">
              <Image
                src={activePost.blog.picture_url}
                alt={activePost.blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}


          {/* Content */}
          <div
            className="prose max-w-none pdf-content"
            dangerouslySetInnerHTML={{
              __html: activePost?.blog.content,
            }}
          />
        </div>
      </div>


      <div className="max-w-4xl mx-auto px-5 pt-28 pb-24">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-2 bg-white/90 backdrop-blur border shadow-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Article Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {activePost.blog.title}
          </h1>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <div className="flex md:flex-row flex-col">
              By {activePost.blog.author.name} 
             <span>• {timeAgo(activePost.blog.created_at)}</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const link = `https://nextjs-frontend-beta-drab.vercel.app/blog/${activePost.blog.slug}`;
                  setShareLink(link);
                  setShareOpen(true);
                }}
                className="flex justify-center items-center gap-1 hover:text-primary"
              >
                <span className="mr-2 flex gap-2 text-sm text-gray-55 font-medium">
                  {activePost?.blog.shares_count}{" "}
                  <span className="hidden md:block">Shares</span>
                </span>
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex cursor-pointer justify-center items-center gap-1 hover:text-primary disabled:opacity-50"
              >
                <span className="mr-2   hidden md:flex gap-2 text-sm text-gray-55 font-medium">
                  {isDownloading ? "Downloading..." : "Download"}
                </span>
                <Download className="w-4 h-4 cursor-pointer" />
              </button>
            </div>

            <ShareModal
              open={shareOpen}
              setOpen={setShareOpen}
              id={activePost?.id}
              link={shareLink}
              mode="blog"
            />
          </div>
        </div>

        {/* Article Image */}
        {activePost.blog.picture_url && (
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-10">
            <Image
              src={activePost.blog.picture_url}
              alt={activePost.blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePost.blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-full space-y-2 blog-content text-justify"
            dangerouslySetInnerHTML={{ __html: activePost.blog.content }}
          />
        </AnimatePresence>

        {/* Stats */}
        <div className="flex gap-4 items-center text-sm justify-start mt-4 pt-4">
          <div className="flex items-center">
            <span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
              <Eye size={14} color="#1D2432" />
            </span>
            <span className="ml-1 flex gap-2 md:text-sm text-xs text-gray-55 font-medium">
              {activePost?.blog.views_count}{" "}
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
              {activePost?.blog.comments_count}
              <span className="hidden md:block">Comments</span>
            </span>
          </div>
          <div className="flex items-center">
            <span
              onClick={() => handleLike(activePost?.blog.id)}
              className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
            >
              <ThumbsUp
                size={14}
                color={
                  activePost?.blog.has_liked ? "#0BA02C" : "#1D2432"
                }
                fill={activePost?.blog.has_liked ? "#0BA02C" : "none"}
              />
            </span>
            <span className="ml-1 flex gap-2 text-sm text-gray-55 font-medium">
              {activePost?.blog.likes_count}
              <span className="hidden md:block">Likes</span>
            </span>
          </div>

        </div>

        <ReaderCommentSection id={activePost.blog.id} />

      </div>
    </>
  );
}
