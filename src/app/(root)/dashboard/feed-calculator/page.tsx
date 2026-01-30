"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  baseFormSchema,
  poultrySchema,
  fishSchema,
  pigSchema,
  livestockOptions,
  birdsTypeOptions,
  feedTypeOptions,
  type BaseFormData,
} from "@/lib/validations/feed-calculator";
import {
  useFeedCalculator,
  transformFormDataToApiRequest,
  formatApiResponseForDisplay,
} from "@/services/feedCalculatorService";
import { FeedCalculatorResponse } from "@/types";
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
import { useRouter } from "next/navigation";

export default function FeedCalculatorPage() {
  const [selectedLivestock, setSelectedLivestock] = useState<string>("");
  const [selectedBirdsType, setSelectedBirdsType] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const router = useRouter();
  
  // Feed calculator API hook
  const feedCalculatorMutation = useFeedCalculator();

  // Dynamic schema based on livestock selection
  const getSchema = () => {
    switch (selectedLivestock) {
      case "Poultry":
        return poultrySchema;
      case "Fish":
        return fishSchema;
      case "Pig":
        return pigSchema;
      default:
        return baseFormSchema;
    }
  };

  const form = useForm<any>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      livestockCategory: "",
    },
    mode: "onChange",
  });

  // Watch form values to trigger re-renders
  const watchedValues = form.watch();

  // Check if form is valid for submit button
  const isFormValid = () => {
    const values = form.getValues();

    if (!selectedLivestock) return false;

    switch (selectedLivestock) {
      case "Poultry":
        return !!(
          values.livestockCategory &&
          values.birdsType &&
          values.feedType &&
          values.numberOfWeeks &&
          values.numberOfBirds &&
          Number(values.numberOfWeeks) > 0 &&
          Number(values.numberOfBirds) > 0
        );
      case "Fish":
        return !!(
          values.livestockCategory &&
          values.sizeOfFish &&
          values.numberOfFish &&
          Number(values.sizeOfFish) > 0 &&
          Number(values.numberOfFish) > 0
        );
      case "Pig":
        return !!(
          values.livestockCategory &&
          values.numberOfPigs &&
          Number(values.numberOfPigs) > 0
        );
      default:
        return false;
    }
  };

  const onSubmit = (data: any) => {
    // console.log("Form submitted:", data);

    try {
      // Transform form data to API request format
      const apiRequest = transformFormDataToApiRequest(data);

      // Call the API
      feedCalculatorMutation.mutate(apiRequest, {
        onSuccess: (response) => {
          // console.log('API Response:', response);

          // Since API returns data directly (not wrapped), extract the actual response
          const responseData = response?.data || response;

          if (responseData) {
            try {
              // Format API response for display
              const formattedResult = formatApiResponseForDisplay(responseData as FeedCalculatorResponse);
              setCalculationResult(formattedResult);
              setShowResults(true);
            } catch (formatError) {
              console.error('Error formatting response:', formatError);
              // console.log('Response data:', responseData);

              // Fallback: show raw response data
              const fallbackData = responseData as any;
              setCalculationResult({
                feedAmount: fallbackData.feed_required || 'N/A',
                formData: data,
              });
              setShowResults(true);
            }
          } else {
            console.error('No response data received');
          }
        },
        onError: (error) => {
          console.error('Feed calculation failed:', error);
          // Optionally show fallback or keep form open
        }
      });
    } catch (error) {
      console.error('Error transforming form data:', error);
    }
  };

  const handleLivestockChange = (value: string) => {
    setSelectedLivestock(value);
    setSelectedBirdsType("");

    // Reset form with new schema
    form.reset({
      livestockCategory: value,
    });
  };

  const handleBirdsTypeChange = (value: string) => {
    setSelectedBirdsType(value);
    form.setValue("birdsType", value);
  };



  const handleRestart = () => {
    setShowResults(false);
    setCalculationResult(null);
    setSelectedLivestock("");
    setSelectedBirdsType("");
    form.reset({
      livestockCategory: "",
    });
  };

  const renderResultsView = () => {
    if (!calculationResult) return null;

    const { feedAmount, formData } = calculationResult;

    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        {/* Feed Amount Display */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            {feedAmount}kg
          </h2>
          <p className="text-gray-600">Results</p>
        </div>

        {/* Form Data Summary */}
        <div className="space-y-4 mb-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Livestock Category</p>
            <p className="font-semibold text-gray-900">{formData.livestockCategory}</p>
          </div>

          {formData.birdsType && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Birds Type</p>
              <p className="font-semibold text-gray-900">{formData.birdsType}</p>
            </div>
          )}

          {formData.feedType && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Feed Type</p>
              <p className="font-semibold text-gray-900">{formData.feedType}</p>
            </div>
          )}

          {formData.numberOfBirds && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Number of Birds</p>
              <p className="font-semibold text-gray-900">{formData.numberOfBirds}</p>
            </div>
          )}

          {formData.numberOfWeeks && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Number of Weeks</p>
              <p className="font-semibold text-gray-900">{formData.numberOfWeeks}</p>
            </div>
          )}

          {formData.sizeOfFish && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Size of Fish</p>
              <p className="font-semibold text-gray-900">{formData.sizeOfFish}</p>
            </div>
          )}

          {formData.numberOfFish && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Number of Fish</p>
              <p className="font-semibold text-gray-900">{formData.numberOfFish}</p>
            </div>
          )}

          {formData.numberOfPigs && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Number of Pigs</p>
              <p className="font-semibold text-gray-900">{formData.numberOfPigs}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => router.push("http://localhost:3000/dashboard/vet-vendor?category=Vendor")}
            className="w-full bg-orange-200 hover:bg-orange-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
          >
            Contact a Vendor
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

  const renderDynamicFields = () => {
    if (!selectedLivestock) return null;

    switch (selectedLivestock) {
      case "Poultry":
        return (
          <>
            {/* Birds Type Field */}
            <FormField
              control={form.control}
              name="birdsType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birds Type (Required)</FormLabel>
                  <Select
                    onValueChange={handleBirdsTypeChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select birds type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {birdsTypeOptions.map((option) => (
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

            {/* Feed Type Field */}
            {selectedBirdsType && (
              <FormField
                control={form.control}
                name="feedType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feed Type (Required)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select feed type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {feedTypeOptions[selectedBirdsType as keyof typeof feedTypeOptions]?.map(
                          (option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Number of Weeks */}
            <FormField
              control={form.control}
              name="numberOfWeeks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Number of Weeks (Required)
                    {selectedBirdsType === "Broilers" && " - Minimum of 3 Weeks"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={selectedBirdsType === "Broilers" ? "12" : "Enter weeks"}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Birds */}
            <FormField
              control={form.control}
              name="numberOfBirds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Birds (Required)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "Fish":
        return (
          <>
            {/* Size of Fish */}
            <FormField
              control={form.control}
              name="sizeOfFish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size of Fish (Required)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Fish */}
            <FormField
              control={form.control}
              name="numberOfFish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Fish (Required)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="50"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "Pig":
        return (
          <>
            {/* Number of Pigs */}
            <FormField
              control={form.control}
              name="numberOfPigs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Pigs (Required)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="35"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-11/12 mt-3 m-auto">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Feed Calculator
          </h1>
          <p className="text-gray-600">
            Calculate Feed for your pets and livestocks
          </p>
        </div>

        {/* Conditional Rendering: Form or Results */}
        {showResults ? (
          renderResultsView()
        ) : (
          <div className="bg-white border-gray-225 border rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Livestock Category */}
                <FormField
                  control={form.control}
                  name="livestockCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Livestock Category (Required)</FormLabel>
                      <Select
                        onValueChange={handleLivestockChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select livestock category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {livestockOptions.map((option) => (
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

                {/* Dynamic Fields */}
                {renderDynamicFields()}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!isFormValid() || feedCalculatorMutation.isPending}
                >
                  {feedCalculatorMutation.isPending ? 'Calculating...' : 'Submit'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}