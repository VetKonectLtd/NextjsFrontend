"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CasesDownload, CasesLoadMore } from "@/app/assets/icons";
import { casesService, Case, Comment } from "@/services/casesService";
import { toast } from "sonner"; // Assuming sonner

const CaseDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  // const [loadingComments, setLoadingComments] = useState(false); // Can implement if needed

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [caseRes, commentsRes] = await Promise.all([
             casesService.getCaseById(id),
             casesService.getComments(id) // Assuming this exists based on your request, though implementation plan had it.
        ]);

        if (caseRes.success && caseRes.data?.case) {
          setCaseData(caseRes.data.case);
        }
        
        // Handle comments response structure
        // The service returns ApiResponse<{ comments: Comment[] }>
        if (commentsRes.success && commentsRes.data?.comments) {
            setComments(commentsRes.data.comments);
        } else if (Array.isArray(commentsRes.data)) {
            // Fallback if API returns array directly
            setComments(commentsRes.data);
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
      console.log("Download report for", id);
      // Implementation depends on backend PDF generation endpoint
  };

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

  const DetailRow = ({ label, value, isLink = false }: { label: string; value?: string | number | null; isLink?: boolean }) => (
    <div className="flex items-center mb-6">
      <span className="text-[#1A1A1A] font-bold w-[200px] shrink-0">{label}:</span>
      {isLink ? (
        <span className="text-[#0B6614] cursor-pointer hover:underline font-medium break-all">{value || "N/A"}</span>
      ) : (
        <span className="text-gray-600 font-normal break-words flex-1">{value || "N/A"}</span>
      )}
    </div>
  );

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen font-sans">
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
            <DetailRow label="Client's Phone Number" value={caseData.client_phone_number} />
            <DetailRow label="Pet Name" value={caseData.pet_name} />
            <DetailRow label="Breed" value={caseData.breed} />
            <DetailRow label="Sex" value={caseData.sex} />
            <DetailRow label="Date Occured" value={caseData.date_occurred} />
            
            {/* Handling Array for Clinical Signs */}
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
            {/* Note: Client Name is not in the Payload definition for API, checking if we missed it or it's not there.
                The provided payload example doesn't have "client_name". 
                "client_phone_number" is there. I will use the phone as placeholder or check if user object is returned implicitly?
                Actually, looking at response types, usually specific data is returned. 
                I will skip Client Name if not available or map it if I find it.
            */}
            {/* <DetailRow label="Client Name" value={"--"} />  */} 
            
            <DetailRow label="Pet/Farm" value={caseData.pet_or_farm} />
            <DetailRow label="Specie" value={caseData.specie} />
            <DetailRow label="Age(Years)" value={caseData.age} />
            {/* Pet Number also not transparent in 'add-case' payload, might be auto-generated or missing */}
            <DetailRow label="Pet Number" value={`#${caseData.id}`} /> 
            
            <DetailRow label="Date Presented" value={caseData.date_presented} />
            <DetailRow label="Temperature" value={caseData.temperature} />
            <DetailRow label="Weight" value={caseData.weight} />
            <DetailRow label="Tentative Diag." value={caseData.tentative_diagnosis} />
            <DetailRow 
                label="Treatment" 
                value={Array.isArray(caseData.treatment_regimen) ? caseData.treatment_regimen.join(", ") : caseData.treatment_regimen} 
            />
            <DetailRow label="Image" value={typeof caseData.picture === 'string' ? "View Image" : "Uploaded"} isLink />
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

        {/* Footer Actions */}
        <div className="flex flex-col items-center gap-8 mt-12">
            <button className="w-[300px] py-3 rounded-lg border border-[#0B6614] text-[#0B6614] font-bold hover:bg-green-50 transition">
              Comment ({comments.length})
            </button>

            {/* If there are comments, maybe show them? For now matching mockup which just shows button */}
            
            <button className="flex items-center gap-3 px-6 py-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
               <span className="text-[#1A1A1A] font-bold text-sm">Loading more...</span>
               <Image src={CasesLoadMore} alt="Load More" width={20} height={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsPage;
