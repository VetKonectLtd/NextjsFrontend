
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Share2,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CasesDownload, CasesAdd, CasesLoadMore } from "@/app/assets/icons";
import { casesService, Case } from "@/services/casesService";
import { toast } from "sonner"; // Assuming sonner is used, or alert
import { DateSelectionModal } from "@/components/modals/DateSelectionModal";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { AlertTriangle } from "lucide-react";

const CasesPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Download Modal State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [caseToDeleteId, setCaseToDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCases = async (page: number) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await casesService.getUserCases(page);
      
      // Handle different response structures (with or without success wrapper)
      const success = response.success || (response as any).cases || (response.data && response.data.cases);
      
      if (success) {
        // Determine where 'cases' object is located
        let casesData;
        if (response.data && response.data.cases) {
            casesData = response.data.cases;
        } else if ((response as any).cases) {
            casesData = (response as any).cases;
        }

        if (casesData) {
            if (page === 1) {
                setCases(casesData.data);
            } else {
                setCases(prev => [...prev, ...casesData.data]);
            }
            setTotalPages(casesData.last_page);
            setCurrentPage(casesData.current_page);
        }
      }
    } catch (error) {
      console.error("Failed to fetch cases", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCases(1);
  }, []);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
        fetchCases(currentPage + 1);
    }
  };

  const handleDeleteClick = (id: number) => {
      setCaseToDeleteId(id);
      setIsDeleteModalOpen(true);
  };

  const performDelete = async () => {
    if (caseToDeleteId === null) return;
    setIsDeleting(true);
    try {
        const res = await casesService.deleteCase(caseToDeleteId);
        if(res.success || res.message === "Case deleted successfully") {
            setCases(prev => prev.filter(c => c.id !== caseToDeleteId));
            toast.success("Case deleted successfully");
            setIsDeleteModalOpen(false);
        } else {
             // Fallback if success false but api didn't throw
             toast.error(res.message || "Failed to delete case");
        }
    } catch (error: any) {
        console.error("Failed to delete case", error);
        // Robust error naming check
        const errMsg = error?.response?.data?.message || error?.message || "Failed to delete case";
        
        if (errMsg === "Forbidden" || error?.response?.status === 403) {
             toast.error("You do not have permission to delete this case");
        } else {
             toast.error(errMsg);
        }
    } finally {
        setIsDeleting(false);
    }
  }

  const handleDownloadReport = () => {
      setIsDownloadModalOpen(true);
  };

  const performDownload = async (from: string, to: string) => {
      setIsDownloading(true);
      try {
          const blob = await casesService.downloadReport(from, to);
          
          // Create object URL and trigger download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'vetkonnect-datedownloaded-cases.xlsx'; // Or .csv if applicable
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

  // Client-side filtering for search on the *fetched* data 
  const filteredCases = cases.filter((c) =>
    c.case_title.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div className="w-11/12 mt-3 m-auto bg-white min-h-screen pb-20">
      <DateSelectionModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        onDownload={performDownload}
        isLoading={isDownloading}
      />
      
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={performDelete}
        title="Delete Case"
        message="Are you sure you want to delete this case? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isDeleting}
        icon={<AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />} // Larger icon for modal
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl text-gray-900 font-bold">Cases</h1>
        <button 
          onClick={handleDownloadReport}
          className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:opacity-80 transition"
        >
          <span>Download Report</span>
          <div className="w-10 h-10 flex items-center justify-center">
            <Image src={CasesDownload} alt="Download" width={40} height={40} />
          </div>
        </button>
      </div>

      {/* Search Bar - Reduced Height */}
      <div className="mb-6 flex shadow-md rounded-[16px] overflow-hidden border border-gray-100 items-center">
        <div className="flex-1 relative h-[48px]"> {/* Reduced from 56px */}
          <input
            type="text"
            placeholder="Search for a case"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 bg-white focus:outline-none text-gray-700 placeholder:text-gray-400 h-full text-sm"
          />
        </div>
        <button className="w-[120px] h-[48px] bg-[#0B6614] hover:bg-green-800 text-white flex items-center justify-center gap-2 font-medium transition text-sm">
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* Add New Case Button - Reduced size */}
      <Link
        href="/dashboard/cases/add"
        className="flex items-center justify-between w-full bg-white border-2 border-[#52CE06] rounded-2xl p-3 mb-6 shadow-md hover:shadow-lg transition group" // Reduced p-4 to p-3
      >
        <span className="text-gray-900 text-sm font-bold ml-2">Add New Case</span>
        <div className="w-8 h-8 flex items-center justify-center rounded-xl transition"> {/* Reduced icon container */}
           <Image src={CasesAdd} alt="Add Case" width={32} height={32} />
        </div>
      </Link>

      {/* Cases List */}
      {loading ? (
          <div className="text-center py-10">Loading cases...</div>
      ) : (
      <div className="space-y-4">
        {filteredCases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="bg-white border-[0.5px] border-gray-100 rounded-xl p-5 shadow-[0px_11.38px_35.02px_0px_#1B19560F] hover:shadow-lg transition"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-base font-medium text-[#1A1A1A] mb-1">{caseItem.case_title}</h3>
                {/* Displaying public Case ID string */}
                <p className="text-xs text-gray-500 font-medium">{caseItem.case_id || `#${caseItem.id}`}</p> 
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full sm:w-auto">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full whitespace-nowrap">
                  {new Date(caseItem.date_occurred).toLocaleDateString()}
                </span>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDeleteClick(caseItem.id)}
                    className="w-[40px] h-[40px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:shadow-sm transition group"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/dashboard/cases/${caseItem.id}`}
                    className="w-[40px] h-[40px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-200 hover:shadow-sm transition group"
                    title="View Details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    className="w-[40px] h-[40px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-200 hover:shadow-sm transition group"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredCases.length === 0 && <div className="text-center py-4 text-gray-500">No cases found</div>}
      </div>
      )}

      {/* Load More Button */}
      {currentPage < totalPages && (
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-8 py-3 shadow-sm hover:shadow-md transition disabled:opacity-50"
        >
          <span className="text-[#101828] font-semibold text-lg">{loadingMore ? "Loading..." : "Load more..."}</span>
          <Image src={CasesLoadMore} alt="Load More" width={24} height={24} />
        </button>
      </div>
      )}
    </div>
  );
};

export default CasesPage;
