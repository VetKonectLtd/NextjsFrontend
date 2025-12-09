"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caseFormSchema, CaseFormData, validateStep1, validateStep2, validateStep3, validateStep4, speciesOptions, livestockTypes, clinicalSignsOptions, diseaseClassificationOptions } from "@/lib/validations/case-form";
import { casesService } from "@/services/casesService";
import { toast } from "sonner";

const AddCasePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [selectedClinicalSigns, setSelectedClinicalSigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<CaseFormData>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      caseTitle: "",
      clientName: "",
      clientPhoneNumber: "",
      petOrFarm: undefined,
      petName: "",
      farmName: "",
      species: "",
      typeOfLivestock: "",
      breed: "",
      numberOfLivestock: undefined,
      age: undefined,
      numberOfWorkers: undefined,
      sex: undefined,
      petNumber: "",
      location: "",
      otherDetails: "",
      dateOccurred: "",
      history: "",
      clinicalSigns: [],
      tentativeDiagnosis: "",
      differentialDiagnosis: "",
      diseaseClassification: "",
      labConfirmed: undefined,
      mortality: undefined,
      treatmentRegimen: "",
      clinicPhysicalAddress: "",
      mobileVeterinarian: "",
      images: []
    }
  });
  
  const watchedValues = form.watch();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const filteredClinicalSigns = clinicalSignsOptions.filter(sign =>
    sign.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClinicalSignToggle = (sign: string) => {
    const updatedSigns = selectedClinicalSigns.includes(sign)
      ? selectedClinicalSigns.filter(s => s !== sign)
      : [...selectedClinicalSigns, sign];
    
    setSelectedClinicalSigns(updatedSigns);
    form.setValue('clinicalSigns', updatedSigns);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentImages = form.getValues('images') || [];
      const newImages = [...currentImages, ...files];
      form.setValue('images', newImages);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const removeImage = (index: number) => {
    const currentImages = form.getValues('images') || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue('images', newImages);
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    const currentData = form.getValues();
    console.log("handleNext called. Current Step:", currentStep, "Form Data:", currentData);
    
    if (currentStep === 1) {
      // Validate step 1 fields including conditional pet/farm fields
      const step1Valid = currentData.caseTitle && currentData.clientName && currentData.clientPhoneNumber && currentData.petOrFarm;
      let conditionalValid = false;
      
      if (currentData.petOrFarm === 'Pet') {
        conditionalValid = !!(currentData.petName && currentData.species && currentData.breed && currentData.age && currentData.sex);
      } else if (currentData.petOrFarm === 'Farm') {
        conditionalValid = !!(currentData.farmName && currentData.typeOfLivestock && currentData.numberOfLivestock && currentData.numberOfWorkers);
      }
      
      if (step1Valid && conditionalValid) {
        setCurrentStep(2);
      } else {
        console.log("Step 1 validation failed:", { step1Valid, conditionalValid });
      }
    } else if (currentStep === 2) {
      // Handle form submission directly without relying on Zod validation
      console.log("Submitting form directly...");
      await onSubmit(currentData);
    }
  };
  
  const onSubmit = async (data: CaseFormData) => {
    console.log("onSubmit called with data:", data);
    setIsSubmitting(true);
    try {
        // Split treatment_regimen by newlines to create array
        const treatmentRegimenArray = data.treatmentRegimen 
          ? data.treatmentRegimen.split('\n').map(line => line.trim()).filter(line => line !== '') 
          : [];

        // Map form data to API payload
        // Note: For Pet cases, use clinicPhysicalAddress as location since form doesn't have separate location field
        const locationValue = data.petOrFarm === 'Pet' 
          ? (data.clinicPhysicalAddress || "") 
          : (data.location || "");

        const payload: any = {
            case_title: data.caseTitle,
            client_name: data.clientName,
            client_phone_number: data.clientPhoneNumber,
            pet_or_farm: data.petOrFarm,
            pet_name: data.petName || null,
            specie: data.species || null,
            breed: data.breed || null,
            pet_number: data.petNumber || null,
            farm_name: data.farmName || null,
            type_of_livestock: data.typeOfLivestock || null,
            number_of_livestock: data.numberOfLivestock || null,
            number_of_workers: data.numberOfWorkers || null,
            age: data.age || 0,
            sex: data.sex || "Male",
            location: locationValue,
            other_details: data.otherDetails || "",
            date_occurred: data.dateOccurred,
            date_presented: new Date().toISOString().split('T')[0],
            history: data.history || "",
            clinical_signs: data.clinicalSigns || [],
            temperature: "N/A",
            heart_rate: "N/A",
            weight: "N/A",
            tentative_diagnosis: data.tentativeDiagnosis || "N/A",
            differential_diagnosis: data.differentialDiagnosis || "N/A",
            lab_confirm: data.labConfirmed || "No",
            mortality: data.mortality || "None",
            treatment_regimen: treatmentRegimenArray,
            picture: data.images && data.images.length > 0 ? data.images[0] : null,
        };

        console.log("Sending payload to API:", payload);

        const res = await casesService.addCase(payload);
        console.log("API Response:", res);
        
        // Check for success via boolean flag OR specific success message/data presence
        // Cast to any to access 'case' property which might not be in the strict ApiResponse type
        if (res.success || res.message === "Case created successfully" || ((res as any).case && (res as any).case.case_id)) {
            toast.success("Case added successfully");
            router.push("/dashboard/cases");
        } else {
            console.error("API returned failure:", res);
            // Try to get message from response, could be res.message or res.data.message
            const errorMessage = res.message || res.data?.message || "Failed to add case";
            toast.error(errorMessage);
        }
    } catch (error: any) {
        console.error("Error adding case:", error);
        // Try to extract message from error response
        const errorMessage = error?.response?.data?.message 
          || error?.message 
          || "An error occurred while adding the case";
        toast.error(errorMessage);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const isCurrentStepValid = () => {
    const currentData = form.getValues();
    if (currentStep === 1) {
      const step1Valid = currentData.caseTitle && currentData.clientName && currentData.clientPhoneNumber && currentData.petOrFarm;
      let conditionalValid = false;
      
      if (currentData.petOrFarm === 'Pet') {
        conditionalValid = !!(currentData.petName && currentData.species && currentData.breed && currentData.age && currentData.sex);
      } else if (currentData.petOrFarm === 'Farm') {
        conditionalValid = !!(currentData.farmName && currentData.typeOfLivestock && currentData.numberOfLivestock && currentData.numberOfWorkers);
      }
      
      return step1Valid && conditionalValid;
    } else if (currentStep === 2) {
      // Only require dateOccurred and at least one clinical sign for Step 2
      // Removed clinicPhysicalAddress and mobileVeterinarian as required
      return !!(currentData.dateOccurred && currentData.clinicalSigns && currentData.clinicalSigns.length > 0);
    }
    return false;
  };

  return (
    <div className="min-h-screen w-11/12 m-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
        </div>
        
        {/* Centered Title and Subtitle */}
        <div className="text-center mt-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentStep === 1 ? "Case Details" : "Disease Records"}
          </h1>
          <p className="text-sm text-gray-600">
            You can add a new case to your case list
          </p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 pb-4 bg-white">
        <div className="max-w-sm mx-auto">
        {currentStep === 1 && (
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Case Details</h3>
            
            {/* Case Title */}
            <div>
              <input
                type="text"
                placeholder="Case Title"
                {...form.register('caseTitle')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {form.formState.errors.caseTitle && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.caseTitle.message}</p>
              )}
            </div>

            {/* The Client Details Header */}
            <div className="pt-2">
              <h3 className="text-base font-medium text-gray-900 mb-2">The Client Details</h3>
            </div>

            {/* Client Name */}
            <div>
              <input
                type="text"
                placeholder="Client Name"
                {...form.register('clientName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {form.formState.errors.clientName && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.clientName.message}</p>
              )}
            </div>

            {/* Client Phone Number */}
            <div>
              <input
                type="tel"
                placeholder="Client Phone Number"
                {...form.register('clientPhoneNumber')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {form.formState.errors.clientPhoneNumber && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.clientPhoneNumber.message}</p>
              )}
            </div>

            {/* Pet or Farm Dropdown */}
            <div>
              <select
                {...form.register('petOrFarm')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Select Pet or Farm</option>
                <option value="Pet">Pet</option>
                <option value="Farm">Farm</option>
              </select>
              {form.formState.errors.petOrFarm && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.petOrFarm.message}</p>
              )}
            </div>

            {/* Conditional Pet/Farm Details */}
            {watchedValues.petOrFarm && (
              <div className="pt-3">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {watchedValues.petOrFarm === 'Pet' ? 'Pet Details' : 'Farm Details'}
                </h3>
                
                <div className="space-y-3">
                  {watchedValues.petOrFarm === 'Pet' ? (
                    <>
                      {/* Pet Name */}
                      <div>
                        <input
                          type="text"
                          placeholder="Pet Name"
                          {...form.register('petName')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Species */}
                      <div>
                        <select
                          {...form.register('species')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                        >
                          <option value="">Select Species</option>
                          {speciesOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Breed */}
                      <div>
                        <input
                          type="text"
                          placeholder="Breed"
                          {...form.register('breed')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Age */}
                      <div>
                        <input
                          type="number"
                          placeholder="Age (Years)"
                          {...form.register('age', { valueAsNumber: true })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Sex */}
                      <div>
                        <select
                          {...form.register('sex')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                        >
                          <option value="">Select Sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      {/* Pet Number */}
                      <div>
                        <input
                          type="text"
                          placeholder="Pet Number"
                          {...form.register('petNumber')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Farm Name */}
                      <div>
                        <input
                          type="text"
                          placeholder="Farm Name"
                          {...form.register('farmName')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Type of Livestock */}
                      <div>
                        <select
                          {...form.register('typeOfLivestock')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                        >
                          <option value="">Select Livestock Type</option>
                          {livestockTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      {/* Number of Livestock */}
                      <div>
                        <input
                          type="number"
                          placeholder="Number of Livestock"
                          {...form.register('numberOfLivestock', { valueAsNumber: true })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Number of Workers */}
                      <div>
                        <input
                          type="number"
                          placeholder="Number of Workers"
                          {...form.register('numberOfWorkers', { valueAsNumber: true })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Age (Years) */}
                      <div>
                        <input
                          type="number"
                          placeholder="Age (Years)"
                          {...form.register('age', { valueAsNumber: true })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Sex */}
                      <div>
                        <select
                          {...form.register('sex')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                        >
                          <option value="">Select Sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      {/* Location */}
                      <div>
                        <input
                          type="text"
                          placeholder="Location"
                          {...form.register('location')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      {/* Other Details */}
                      <div>
                        <textarea
                          placeholder="Other Details"
                          {...form.register('otherDetails')}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div className="pt-3">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                {imagePreview.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            width={150}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      Add More Images
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 font-medium">Add Images</p>
                      <p className="text-sm text-gray-500 mt-1">No image added yet</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      Choose Files
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4">
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-3">
            
            {/* Date Occurred */}
            <div>
              <input
                type="date"
                {...form.register('dateOccurred')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {form.formState.errors.dateOccurred && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.dateOccurred.message}</p>
              )}
            </div>

            {/* History */}
            <div>
              <textarea
                placeholder="History"
                {...form.register('history')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Clinical Signs - Multi-select Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="min-h-[48px] w-full border border-gray-300 rounded-xl px-4 py-3 cursor-pointer bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedClinicalSigns.length === 0 ? (
                  <span className="text-gray-500">Clinical Signs</span>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {selectedClinicalSigns.map((sign) => (
                      <span
                        key={sign}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                      >
                        {sign}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClinicalSignToggle(sign);
                          }}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
                  {/* Search Input */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search clinical signs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 border-gray-300 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Signs List */}
                  <div className="max-h-48 overflow-y-auto">
                    {filteredClinicalSigns.length === 0 ? (
                      <div className="p-3 text-sm text-gray-500">No clinical signs found</div>
                    ) : (
                      filteredClinicalSigns.map((sign) => (
                        <label
                          key={sign}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedClinicalSigns.includes(sign)}
                            onChange={() => handleClinicalSignToggle(sign)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{sign}</span>
                        </label>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{selectedClinicalSigns.length} selected</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDropdownOpen(false);
                        }}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {form.formState.errors.clinicalSigns && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.clinicalSigns.message}</p>
              )}
            </div>

            {/* Tentative Diagnosis */}
            <div>
              <input
                type="text"
                placeholder="Tentative Diagnosis"
                {...form.register('tentativeDiagnosis')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Differential Diagnosis */}
            <div>
              <input
                type="text"
                placeholder="Differential Diagnosis"
                {...form.register('differentialDiagnosis')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Disease Classification */}
            <div>
              <select
                {...form.register('diseaseClassification')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Disease Classification</option>
                {diseaseClassificationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Lab Confirmed */}
            <div>
              <select
                {...form.register('labConfirmed')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Lab Confirmed</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Mortality */}
            <div>
              <select
                {...form.register('mortality')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Mortality</option>
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Treatment Regimen */}
            <div>
              <textarea
                placeholder="Treatment Regimen"
                {...form.register('treatmentRegimen')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Clinic Location Header */}
            <div className="pt-3">
              <h3 className="text-base font-medium text-gray-900 mb-2">Clinic Location</h3>
            </div>

            {/* Clinic Physical Address */}
            <div>
              <input
                type="text"
                placeholder="Clinic Physical Address"
                {...form.register('clinicPhysicalAddress')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {form.formState.errors.clinicPhysicalAddress && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.clinicPhysicalAddress.message}</p>
              )}
            </div>

            {/* Mobile Veterinarian */}
            <div>
              <input
                type="text"
                placeholder="Mobile Veterinarian"
                {...form.register('mobileVeterinarian')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {form.formState.errors.mobileVeterinarian && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.mobileVeterinarian.message}</p>
              )}
            </div>

            {/* Case Image */}
            <div className="pt-3">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                {imagePreview.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={preview}
                            alt={`Case image ${index + 1}`}
                            width={300}
                            height={200}
                            className="mx-auto rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview([]);
                        form.setValue('images', []);
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 font-medium">Add Images</p>
                      <p className="text-sm text-gray-500 mt-1">No image added yet</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      Choose Files
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepValid() || isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding Case..." : "Add"}
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AddCasePage;
