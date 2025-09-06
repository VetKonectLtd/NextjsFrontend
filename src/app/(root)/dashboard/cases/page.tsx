"use client";

import { useState } from "react";
import { 
  Plus, 
  Download, 
  Edit, 
  Eye, 
  Trash2, 
  Share2, 
  MoreHorizontal,
  PlusIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface CaseData {
  id: string;
  title: string;
  caseNumber: string;
  timeAgo: string;
  clientName: string;
  clientPhone: string;
  petOrFarm: "Pet" | "Farm";
  petName: string;
  species: string;
  breed: string;
  age: number;
  sex: "Male" | "Female";
  petNumber: string;
  confirmatoryDiagnosis: string;
  clinicalSigns: string;
  dateOccurred: string;
  dateReported: string;
  request: string;
  chiefComplaint: string;
  history: string;
  physicalExamination: string;
  differentialDiagnosis: string;
  tentativeDiagnosis: string;
  confirmatoryDiagnosisDetails: string;
  mortality: string;
  treatmentRegimen: string;
  clinicAddress: string;
  clinicName: string;
  veterinarianName: string;
  imageTaken?: string;
}

const CasesPage = () => {
  const [cases, setCases] = useState<CaseData[]>([
    {
      id: "1",
      title: "Kora's Treatment",
      caseNumber: "CS092201a",
      timeAgo: "15 mins ago",
      clientName: "Dolapo Adaba",
      clientPhone: "+2348100000000",
      petOrFarm: "Pet",
      petName: "Kora",
      species: "Dog",
      breed: "Rottweiler",
      age: 2,
      sex: "Male",
      petNumber: "PT092201a",
      confirmatoryDiagnosis: "Parasitic Infection",
      clinicalSigns: "Loss of Appetite, Weight Loss, Diarrhea, Inflammation",
      dateOccurred: "03/12/2023",
      dateReported: "03/20/2023",
      request: "Routine",
      chiefComplaint: "Hemorrhage",
      history: "None",
      physicalExamination: "None",
      differentialDiagnosis: "None",
      tentativeDiagnosis: "None",
      confirmatoryDiagnosisDetails: "Yes",
      mortality: "None",
      treatmentRegimen: "Text here",
      clinicAddress: "220, Awe College Road, Ikeja, Lagos, Nigeria",
      clinicName: "VTH, University of Ibadan",
      veterinarianName: "Dr Waywealth",
      imageTaken: "View image"
    },
    {
      id: "2",
      title: "Adibala Poultry Treatment",
      caseNumber: "CS092201b",
      timeAgo: "15 mins ago",
      clientName: "Adibala Farms",
      clientPhone: "+2348100000001",
      petOrFarm: "Farm",
      petName: "Poultry Flock",
      species: "Chicken",
      breed: "Broiler",
      age: 1,
      sex: "Male",
      petNumber: "PT092201b",
      confirmatoryDiagnosis: "Viral Infection",
      clinicalSigns: "Respiratory distress, Decreased egg production",
      dateOccurred: "03/10/2023",
      dateReported: "03/18/2023",
      request: "Emergency",
      chiefComplaint: "Sudden death",
      history: "Recent introduction of new birds",
      physicalExamination: "Respiratory congestion",
      differentialDiagnosis: "Newcastle Disease",
      tentativeDiagnosis: "Avian Influenza",
      confirmatoryDiagnosisDetails: "Yes",
      mortality: "5%",
      treatmentRegimen: "Antiviral treatment",
      clinicAddress: "15, Farm Road, Ogun State, Nigeria",
      clinicName: "Agricultural Development Center",
      veterinarianName: "Dr Adebayo",
      imageTaken: "View image"
    }
  ]);


  const handleAddNewCase = () => {
    // Navigate to add new case page
    console.log("Add new case");
  };

  const handleDownloadReport = () => {
    // Download report functionality
    console.log("Download report");
  };

  const CaseActions = ({ caseItem }: { caseItem: CaseData }) => (
    <div className="flex items-center gap-2">
      <button className="p-1 hover:bg-gray-100 rounded">
        <Edit className="w-4 h-4 text-gray-600" />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <Eye className="w-4 h-4 text-gray-600" />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <Download className="w-4 h-4 text-gray-600" />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <Trash2 className="w-4 h-4 text-gray-600" />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <Share2 className="w-4 h-4 text-gray-600" />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <MoreHorizontal className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );

  const CaseDetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-gray-100 gap-1">
      <span className="text-sm font-medium text-gray-700 break-words">{label}</span>
      <span className="text-sm text-gray-600 text-left sm:text-right max-w-full sm:max-w-xs break-words">{value}</span>
    </div>
  );

  return (
    <div className="w-11/12 mt-3 m-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl text-gray-55 font-bold">Cases</h1>
        <Button 
          onClick={handleDownloadReport}
          variant="outline"
          className="flex items-center gap-2 text-sm"
        >
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>

      {/* Add New Case Button */}
      <div className="mb-6">
        <Link
          href="/dashboard/cases/add"
          className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
        >
          <span className="text-gray-55 text-sm font-semibold">Add New Case</span>
          <div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
            <PlusIcon className="w-5 h-5 font-bold text-white" />
          </div>
        </Link>
      </div>

      {/* Cases List */}
      <Accordion type="multiple" className="space-y-4">
        {cases.map((caseItem) => (
          <AccordionItem 
            key={caseItem.id} 
            value={caseItem.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <AccordionTrigger className="p-3 sm:p-4 hover:no-underline">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 w-full">
                <div className="flex-1 text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{caseItem.title}</h3>
                  <p className="text-sm text-gray-500">{caseItem.caseNumber}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                  <span className="text-sm text-gray-500">{caseItem.timeAgo}</span>
                  <div className="flex items-center gap-1 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
                    <CaseActions caseItem={caseItem} />
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="p-3 sm:p-4 pt-0">
              <div className="grid grid-cols-1 gap-2 sm:gap-4">
                <CaseDetailRow label="Client Name" value={caseItem.clientName} />
                <CaseDetailRow label="Client Phone Number" value={caseItem.clientPhone} />
                <CaseDetailRow label="Pet or Farm" value={caseItem.petOrFarm} />
                <CaseDetailRow label="Pet Name" value={caseItem.petName} />
                <CaseDetailRow label="Specie" value={caseItem.species} />
                <CaseDetailRow label="Breed" value={caseItem.breed} />
                <CaseDetailRow label="Age (Years)" value={caseItem.age} />
                <CaseDetailRow label="Sex" value={caseItem.sex} />
                <CaseDetailRow label="Pet Number" value={caseItem.petNumber} />
                <CaseDetailRow label="Confirmatory Diagnosis" value={caseItem.confirmatoryDiagnosis} />
                <CaseDetailRow label="Clinical Signs" value={caseItem.clinicalSigns} />
                <CaseDetailRow label="Date Occured" value={caseItem.dateOccurred} />
                <CaseDetailRow label="Date Reported" value={caseItem.dateReported} />
                <CaseDetailRow label="Request (Routine, Prophylaxis, Therapeutic)" value={caseItem.request} />
                <CaseDetailRow label="Chief Complaint" value={caseItem.chiefComplaint} />
                <CaseDetailRow label="History" value={caseItem.history} />
                <CaseDetailRow label="Physical Examination[ Temperature, Pulse, etc]" value={caseItem.physicalExamination} />
                <CaseDetailRow label="Differential Diagnosis" value={caseItem.differentialDiagnosis} />
                <CaseDetailRow label="Tentative Diagnosis" value={caseItem.tentativeDiagnosis} />
                <CaseDetailRow label="Confirmatory Diagnosis" value={caseItem.confirmatoryDiagnosisDetails} />
                <CaseDetailRow label="Mortality" value={caseItem.mortality} />
                <CaseDetailRow label="Treatment Regimen" value={caseItem.treatmentRegimen} />
                <CaseDetailRow label="Clinic Physical Address" value={caseItem.clinicAddress} />
                <CaseDetailRow label="Name of Clinic/Hospital" value={caseItem.clinicName} />
                <CaseDetailRow label="Name of Veterinarian" value={caseItem.veterinarianName} />
                {caseItem.imageTaken && (
                  <CaseDetailRow label="Image taken" value={caseItem.imageTaken} />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CasesPage;
