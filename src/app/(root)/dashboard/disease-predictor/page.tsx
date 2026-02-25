"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    diseasePredictorSchema,
    availableSymptoms,
    diseasePredictions,
    type DiseasePredictorFormData,
} from "@/lib/validations/disease-predictor";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDiseasePredict } from "@/services/diseasePredictService";
import { useRouter } from "next/navigation";


export default function DiseasePredictorPage() {
    const [selectedAnimal, setSelectedAnimal] = useState<string>("");
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [predictionResult, setPredictionResult] = useState<any>(null);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [symptomOptions, setSymptomOptions] = useState<string[]>([]);

    const route = useRouter();
    const { useGetSymptom, useGetCategory, usePredictDisease } = useDiseasePredict();

    const symptomMutation = useGetSymptom();
    // Disease predictor API hook
    const diseasePredictorMutation = usePredictDisease();
    const category = useGetCategory(true);


    const animalSpeciesOptions =
        (category.data as any)?.categories?.map((item: string) => ({
            value: item,
            label: item.charAt(0).toUpperCase() + item.slice(1),
        })) || [];

    useEffect(() => {
        if (selectedAnimal) {
            // clear previous options & selected symptoms
            setSymptomOptions([]);
            setSelectedSymptoms([]);
            form.setValue("symptoms", []);
            symptomMutation.mutate({ category: selectedAnimal });
        } else {
            setSymptomOptions([]);
        }
    }, [selectedAnimal]);


    useEffect(() => {
        const data = symptomMutation.data;
        if (!data) return;

        let list: string[] = [];

        // Fix: Check for symptom (singular) first since that's what your API returns
        if ((data as any)?.symptom && Array.isArray((data as any).symptom)) {
            list = (data as any).symptom;  // Changed from data.symptoms to data.symptom
        } else if (Array.isArray(data)) {
            list = data as string[];
        } else if ((data as any)?.symptoms && Array.isArray((data as any).symptoms)) {
            list = (data as any).symptoms;
        } else if (data?.data && Array.isArray(data.data)) {
            list = data.data;
        } else if ((data as any)?.items && Array.isArray((data as any).items)) {
            list = (data as any).items;
        } else if ((data as any)?.result && Array.isArray((data as any).result)) {
            list = (data as any).result;
        }

        const unique = Array.from(
            new Set(list.map((s) => s.trim().toLowerCase()))
        );
        setSymptomOptions(unique);
    }, [symptomMutation.data]);

    const filteredSymptoms = (symptomOptions.length > 0 ? symptomOptions : availableSymptoms).filter(symptom =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const form = useForm<DiseasePredictorFormData>({
        resolver: zodResolver(diseasePredictorSchema),
        defaultValues: {
            animalSpecies: "",
            symptoms: [],
        },
        mode: "onChange",
    });

    // Watch form values to trigger re-renders
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


    // Check if form is valid for submit button
    const isFormValid = () => {
        const values = form.getValues();
        return !!(
            values.animalSpecies &&
            values.symptoms &&
            values.symptoms.length > 0
        );
    };

    const onSubmit = (data: any) => {
        try {
            // Prepare the request payload for the API
            const apiRequest = {
                category: data.animalSpecies,
                symptom: data.symptoms,
                // Optional: add image if uploaded
                ...(uploadedImage && { image: uploadedImage })
            };


            // Call the disease predictor mutation
            diseasePredictorMutation.mutate(apiRequest, {
                onSuccess: (response) => {

                    // Extract the prediction data from response
                    // API might return: { prediction: "disease_name" } or { disease: "name" } or { result: "name" }
                    let predictedDisease = "";


                    if ((response as any)?.response) {
                        predictedDisease = (response as any)?.response;
                    }

                    // Set the prediction result and show results view
                    setPredictionResult({
                        predictedDisease: predictedDisease || "Unable to determine disease",
                        animalSpecies: data.animalSpecies,
                        symptoms: data.symptoms,
                        hasImage: !!uploadedImage
                    });

                    setShowResults(true);
                },
                onError: (error: any) => {
                    console.error("Disease prediction failed:", error);
                    // Optional: keep form open for retry
                    setShowResults(false);
                }
            });
        } catch (error) {
            console.error("Error preparing disease prediction request:", error);
            alert("An error occurred while preparing your request. Please try again.");
        }
    };

    const handleAnimalChange = (value: string) => {
        setSelectedAnimal(value);
        form.setValue("animalSpecies", value);
    };

    const handleSymptomToggle = (symptom: string) => {
        const currentSymptoms = [...selectedSymptoms];
        const index = currentSymptoms.indexOf(symptom);

        if (index > -1) {
            currentSymptoms.splice(index, 1);
        } else {
            currentSymptoms.push(symptom);
        }

        setSelectedSymptoms(currentSymptoms);
        form.setValue("symptoms", currentSymptoms);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedImage(file);
            form.setValue("image", file);
        }
    };

    const handleRestart = () => {
        setShowResults(false);
        setPredictionResult(null);
        setSelectedAnimal("");
        setSelectedSymptoms([]);
        setUploadedImage(null);
        form.reset({
            animalSpecies: "",
            symptoms: [],
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const renderResultsView = () => {
        if (!predictionResult) return null;

        const { predictedDisease, animalSpecies, symptoms } = predictionResult;

        return (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
                {/* Results Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        Results
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Based on the signs and symptoms you have selected, the suspected condition is
                    </p>
                    <p className="text-xl sm:text-2xl capitalize font-bold text-red-600 mb-6">
                        {predictedDisease}
                    </p>
                </div>

                {/* Form Data Summary */}
                <div className="space-y-6 mb-8">
                    <div className="text-center">
                        <p className="text-gray-500 text-sm mb-1">Select Animal Specie</p>
                        <p className="font-semibold text-gray-900 text-lg">{animalSpecies}</p>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-500 text-sm mb-2">Likely Symptoms</p>
                        <p className="font-semibold text-gray-900">
                            {symptoms.join(", ")}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button
                        onClick={() => route.push("/dashboard/vet-vendor?category=Veterinarian")}
                        className="w-full bg-orange-200 hover:bg-orange-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                    >
                        Consult a Vet
                    </Button>

                    <Button
                        onClick={handleRestart}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                        Restart
                    </Button>
                </div>
            </div>
        );
    };

    const renderSymptomSearch = () => {
        return (
            <div className="space-y-4">
                <FormLabel>Likely Symptoms (Required)</FormLabel>

                {/* Multi-select Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="min-h-[40px] w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {selectedSymptoms.length === 0 ? (
                            <span className="text-gray-500">Select symptoms...</span>
                        ) : (
                            <div className="flex flex-wrap gap-1">
                                {selectedSymptoms.map((symptom, idx) => (
                                    <span
                                        key={`${symptom}-${idx}`}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                                    >
                                        {symptom}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSymptomToggle(symptom);
                                            }}
                                            className="ml-1 text-blue-600 hover:text-blue-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                                className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                    }`}
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
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                            {/* Search Input */}
                            <div className="p-3 border-b border-gray-200">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Search symptoms..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Symptoms List */}
                            <div className="max-h-48 overflow-y-auto">
                                {symptomMutation.isPending ? (
                                    <div className="p-3 text-sm text-gray-500">Loading symptoms...</div>
                                ) : filteredSymptoms.length === 0 ? (
                                    <div className="p-3 text-sm text-gray-500">No symptoms found</div>
                                ) : (
                                    filteredSymptoms.map((symptom) => (
                                        <label
                                            key={symptom}
                                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-3"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedSymptoms.includes(symptom)}
                                                onChange={() => handleSymptomToggle(symptom)}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700">{symptom}</span>
                                        </label>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-3 border-t border-gray-200 bg-gray-50">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>{selectedSymptoms.length} selected</span>
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
                </div>

                {selectedSymptoms.length === 0 && (
                    <p className="text-sm text-red-600">At least one symptom is required</p>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen w-11/12 mt-3 m-auto">
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Disease Predictor
                    </h1>
                    <p className="text-gray-600">
                        Find out what could likely be wrong with your pet or livestock
                        through the noticeable signs and symptoms
                    </p>
                </div>

                {/* Conditional Rendering: Form or Results */}
                {showResults ? (
                    renderResultsView()
                ) : (
                    <div className="bg-white rounded-lg border-gray-225 border shadow-md p-4 sm:p-6 lg:p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Animal Species Selection */}
                                <FormField
                                    control={form.control}
                                    name="animalSpecies"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Animal Specie (Required)</FormLabel>
                                            <Select
                                                onValueChange={handleAnimalChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select animal species" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {animalSpeciesOptions.map((option: any) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Symptoms Selection */}
                                <FormField
                                    control={form.control}
                                    name="symptoms"
                                    render={() => (
                                        <FormItem>
                                            {renderSymptomSearch()}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <FormLabel>Add Image (Optional)</FormLabel>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {uploadedImage ? (
                                            <div>
                                                <p className="text-green-600 font-medium">Image uploaded: {uploadedImage.name}</p>
                                                <p className="text-sm text-gray-500 mt-1">Click to change image</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-gray-600 font-medium">Add Image</p>
                                                <p className="text-sm text-gray-500 mt-1">Add profile page image</p>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={!isFormValid() || diseasePredictorMutation.isPending}
                                >
                                    {diseasePredictorMutation.isPending ? 'Predicting...' : 'Predict'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
}