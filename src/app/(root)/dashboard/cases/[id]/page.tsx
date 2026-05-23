"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { CasesDownload, CasesLoadMore } from "@/app/assets/icons";
import { casesService, Case, Comment } from "@/services/casesService";
import { toast } from "sonner"; // Assuming sonner

import { DateSelectionModal } from "@/components/modals/DateSelectionModal";
import { User } from "lucide-react"; // Fallback avatar
import Modal from "@/components/shared/Modal";
import { X, ChevronLeft } from "lucide-react";

const CaseDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Comment Input State
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false); // Quick client-side pagination simulation

  // Download Report State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Image Modal State
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [caseRes, commentsRes] = await Promise.all([
             casesService.getCaseById(id),
             casesService.getComments(id)
        ]);

        // Robust check for case data
        const caseDataRaw = (caseRes as any).case || (caseRes.data && caseRes.data.case);
        if (caseDataRaw) {
          setCaseData(caseDataRaw);
        }
        
        // Robust check for comments
        let commentsData: Comment[] = [];
        if ((commentsRes as any).comments) {
            commentsData = (commentsRes as any).comments;
        } else if (commentsRes.data && commentsRes.data.comments) {
            commentsData = commentsRes.data.comments;
        } else if (Array.isArray(commentsRes.data)) {
            commentsData = commentsRes.data;
        } else if (Array.isArray(commentsRes)) {
            commentsData = commentsRes as any;
        }
        
        if (commentsData.length > 0) {
            setComments(commentsData);
        }

      } catch (error) {
        console.error("Error loading case details", error);
        toast.error("Failed to load case details");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleDownload = () => {
      setIsDownloadModalOpen(true);
  };

  const performDownload = async (from: string, to: string) => {
      setIsDownloading(true);
      try {
          const blob = await casesService.downloadReport(from, to);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'vetkonnect-case-report.xlsx';
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          
          setIsDownloadModalOpen(false);
          toast.success("Report downloaded successfully");
      } catch (error) {
          console.error("Download failed", error);
          toast.error("Failed to download report");
      } finally {
          setIsDownloading(false);
      }
  };

  const handleAddComment = async () => {
      if (!newComment.trim()) return;
      setIsAddingComment(true);
      try {
          // Payload for API: case_id, comment, parent_id?
          const res = await casesService.addComment({
              case_id: Number(id), // Ensure ID is number if API expects number
              comment: newComment,
              parent_id: null 
          });

          // API response check (robust)
          // Usually API returns success message or the new comment. 
          // For now, simple standard check or optimistic update.
          if (res.success || res.message === "Comment added successfully" || (res as any).comment) {
              toast.success("Comment added");
              setNewComment("");
              // Re-fetch comments or update locally. Re-fetching is safer.
              const commentsRes = await casesService.getComments(id);
              let commentsData: Comment[] = [];
              // Reuse robust logic or valid shortcut since we just did it
              if ((commentsRes as any).comments) commentsData = (commentsRes as any).comments;
              else if (commentsRes.data && commentsRes.data.comments) commentsData = commentsRes.data.comments;
              else if (Array.isArray(commentsRes.data)) commentsData = commentsRes.data;
              else if (Array.isArray(commentsRes)) commentsData = commentsRes as any;

              if (commentsData.length > 0) setComments(commentsData);
          } else {
               toast.error("Failed to add comment");
          }

      } catch (error) {
          console.error("Failed to add comment", error);
          toast.error("Failed to add comment");
      } finally {
          setIsAddingComment(false);
      }
  };

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const DetailRow = ({ label, value, isLink = false }: { label: string; value?: string | number | null; isLink?: boolean }) => (
    <div className="flex items-center mb-6">
      <span className="text-[#1A1A1A] font-bold w-[200px] shrink-0">{label}:</span>
      {isLink ? (
        value && value === "View Image" ? (
          <span
            onClick={openImageModal}
            className="text-[#0B6614] cursor-pointer hover:underline font-medium break-all"
          >
            {value}
          </span>
        ) : (
          <span className="text-gray-600 font-normal break-words flex-1">{value || "N/A"}</span>
        )
      ) : (
        <span className="text-gray-600 font-normal break-words flex-1">{value || "N/A"}</span>
      )}
    </div>
  );
  
  // Show only first 5 comments initially, unless 'Load More' is clicked
  const visibleComments = showAllComments ? comments : comments.slice(0, 5);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading case details...</div>;
  }

  if (!caseData) {
    return (
      <div className="p-8 text-center text-gray-500">
        <h2 className="text-xl font-bold">Case Not Found</h2>
        <Link href="/dashboard/cases" className="text-blue-600 hover:underline mt-4 block">
          Return to Cases
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen font-sans">
    
      <DateSelectionModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        onDownload={performDownload}
        isLoading={isDownloading}
      />

      {/* Image Modal */}
      {isImageModalOpen && caseData.picture_url && (
        <Modal onClose={closeImageModal}>
          <div className="relative flex justify-center items-center">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <img
              src={caseData.picture_url}
              alt="Case Image"
              className="max-w-full max-h-screen"
            />
          </div>
        </Modal>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back</span>
        </button>

      <button 
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-medium text-sm hover:shadow-md transition rounded-lg"
      >
           <span className="text-gray-900">Download Report</span>
           <Image src={CasesDownload} alt="Download" width={40} height={40} />
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-[24px] p-8 sm:p-12 shadow-sm w-full border-[0.5px] border-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-2">
          
          {/* Column 1 */}
          <div>
            <DetailRow label="Case Title" value={caseData.case_title} />
            <DetailRow label="Client Name" value={caseData.client_name} />
            <DetailRow label="Client's Phone Number" value={caseData.client_phone_number} />
            <DetailRow label="Pet Name" value={caseData.pet_name} />
            <DetailRow label="Breed" value={caseData.breed} />
            <DetailRow label="Sex" value={caseData.sex} />
            <DetailRow label="Date Occured" value={new Date(caseData.date_occurred).toLocaleDateString()} />
            
            <DetailRow 
                label="Clinical signs" 
                value={Array.isArray(caseData.clinical_signs) ? caseData.clinical_signs.join(", ") : caseData.clinical_signs} 
            />
            
            <DetailRow label="Heart Rate" value={caseData.heart_rate} />
            <DetailRow label="Differential Diag." value={caseData.differential_diagnosis} />
            <DetailRow label="Mortality" value={caseData.mortality} />
          </div>

          {/* Column 2 */}
          <div>
            <DetailRow label="Pet/Farm" value={caseData.pet_or_farm} />
            <DetailRow label="Specie" value={caseData.specie} />
            <DetailRow label="Age(Years)" value={caseData.age} />
            <DetailRow label="Pet Number" value={caseData.pet_number || caseData.case_id || `#${caseData.id}`} /> 
            
            <DetailRow label="Date Presented" value={new Date(caseData.date_presented).toLocaleDateString()} />
            <DetailRow label="Temperature" value={caseData.temperature} />
            <DetailRow label="Weight" value={caseData.weight} />
            <DetailRow label="Tentative Diag." value={caseData.tentative_diagnosis} />
            <DetailRow 
                label="Treatment" 
                value={Array.isArray(caseData.treatment_regimen) ? caseData.treatment_regimen.join(", ") : caseData.treatment_regimen} 
            />
            <DetailRow label="Image" value={caseData.picture_url ? "View Image" : (typeof caseData.picture === 'string' ? "View Image" : "Uploaded")} isLink />
          </div>
        </div>

        {/* Note/History Section */}
        <div className="mt-4 mb-10">
          <div className="flex items-baseline mb-4">
             <span className="text-[#1A1A1A] font-bold w-[200px] shrink-0">Note/History:</span>
          </div>
          <div className="bg-[#FDFDFD] border border-gray-100 rounded-xl p-6 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {caseData.history || "No history available."}
            {caseData.other_details && (
                <>
                    <br/><br/>
                    <strong>Other Details:</strong> {caseData.other_details}
                </>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h3>
            
            {/* Add Comment */}
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full border border-gray-200 rounded-xl p-4 min-h-[100px] focus:outline-none focus:border-green-500 transition resize-y"
                    />
                    <div className="flex justify-end mt-2">
                         <button 
                            onClick={handleAddComment}
                            disabled={isAddingComment || !newComment.trim()}
                            className="bg-[#0B6614] text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
                         >
                            {isAddingComment ? "Posting..." : "Post Comment"}
                         </button>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {visibleComments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                            {comment.user?.profile?.profile_image_url ? (
                                <Image 
                                    src={comment.user.profile.profile_image_url} 
                                    alt={`${comment.user.first_name} ${comment.user.last_name}`} 
                                    width={40} 
                                    height={40} 
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                   <User className="w-5 h-5 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">
                                        {comment.user?.first_name} {comment.user?.last_name}
                                    </h4>
                                    <p className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.comment}</p>
                        </div>
                    </div>
                ))}
                
                {comments.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                )}
            </div>

            {/* Load More Comments Button */}
            {comments.length > 5 && !showAllComments && (
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={() => setShowAllComments(true)}
                        className="flex items-center gap-3 px-6 py-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                        <span className="text-[#1A1A1A] font-bold text-sm">Load more comments</span>
                        <Image src={CasesLoadMore} alt="Load More" width={20} height={20} />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default CaseDetailsPage;
