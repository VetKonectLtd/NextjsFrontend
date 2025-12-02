"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    diseasePredictorSchema,
    animalSpeciesOptions,
    availableSymptoms,
    diseasePredictions,
    type DiseasePredictorFormData,
} from "@/lib/validations/disease-predictor";
import {
    useDiseasePredictor,
    transformDiseasePredictorFormData,
    formatDiseasePredictorResponse,
} from "@/services/diseasePredictorService";
import { DiseasePredictorResponse } from "@/types";
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

    // Disease predictor API hook
    const diseasePredictorMutation = useDiseasePredictor();

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

    const filteredSymptoms = availableSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if form is valid for submit button
    const isFormValid = () => {
        const values = form.getValues();
        return !!(
            values.animalSpecies &&
            values.symptoms &&
            values.symptoms.length > 0
        );
    };

    const onSubmit = (data: DiseasePredictorFormData) => {

        try {
            // Transform form data to API request format
            const apiRequest = transformDiseasePredictorFormData({
                livestockCategory: data.animalSpecies,
                diseases: data.symptoms,
            });

            // Call the API
            diseasePredictorMutation.mutate(apiRequest, {
                onSuccess: (response) => {
                    // console.log('Disease Predictor API Response:', response);
                    
                    // Since API returns data directly (not wrapped), extract the actual response
                    const responseData = response?.data || response;
                    
                    if (responseData) {
                        try {
                            // Format API response for display
                            const formattedResult = formatDiseasePredictorResponse(responseData as DiseasePredictorResponse);
                            
                            setPredictionResult({
                                predictedDisease: formattedResult.prediction,
                                animalSpecies: data.animalSpecies,
                                symptoms: data.symptoms,
                                hasImage: !!uploadedImage,
                            });
                            setShowResults(true);
                        } catch (formatError) {
                            console.error('Error formatting response:', formatError);
                            // console.log('Response data:', responseData);
                            
                            // Fallback: show raw response data
                            const fallbackData = responseData as any;
                            setPredictionResult({
                                predictedDisease: typeof fallbackData === 'string' ? fallbackData : 'Unable to determine disease',
                                animalSpecies: data.animalSpecies,
                                symptoms: data.symptoms,
                                hasImage: !!uploadedImage,
                            });
                            setShowResults(true);
                        }
                    } else {
                        console.error('No response data received');
                    }
                },
                onError: (error) => {
                    console.error('Disease prediction failed:', error);
                    // Optionally show fallback or keep form open
                }
            });
        } catch (error) {
            console.error('Error transforming form data:', error);
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
                    <p className="text-xl sm:text-2xl font-bold text-red-600 mb-6">
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
                        onClick={() => alert("Consult a Vet functionality will be implemented")}
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
                                {selectedSymptoms.map((symptom) => (
                                    <span
                                        key={symptom}
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
                                        placeholder="Likely Symptoms (Required)"
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
                                {filteredSymptoms.length === 0 ? (
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
                                                    {animalSpeciesOptions.map((option) => (
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