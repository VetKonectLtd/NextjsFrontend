"use client";
import { ClinicCart, VetClinic } from "@/app/assets/images";
import FormGooglePlacesCustom from "@/components/form/FormGooglePlacesCustom";
import FormInput from "@/components/form/FormInput";
import TagInput from "@/components/form/TagInput";
import TagSelect from "@/components/form/TagSelect";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useClinicService } from "@/services/clinicService";
import { ClinicListing } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ClinicListingClient() {

    const { useAddClinic } = useClinicService();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const addClinicMutation = useAddClinic();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors, isValid },
    } = useForm<ClinicListing>();

    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    useEffect(() => {
        if (selectedLocation) {
            setValue("latitude", String(selectedLocation.latitude as any));
            setValue("longitude", String(selectedLocation.longitude as any));
        }
    }, [setValue, selectedLocation]);


    const onSubmit = (data: ClinicListing) => {
        const formData: any = new FormData();

        formData.append("clinic_name", data.clinic_name);
        formData.append("email", data.email);
        formData.append("phone_number", data.phone_number);
        formData.append("location", data.location);
        formData.append("latitude", data.latitude || "");
        formData.append("longitude", data.longitude || "");

        (data.clinic_speciality as any).forEach((tag: string) =>
            formData.append("clinic_speciality", tag)
        );

        if (data.picture?.[0]) {
            formData.append("picture", data.picture[0]);
        }

        addClinicMutation.mutate(formData, {
            onSuccess: () => {
                setImagePreview(null);
                reset();

            }
        });
    };

    return (
        <div className="min-h-screen w-11/12 mt-3 m-auto py-10 flex items-center justify-center">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full">
                {/* Left side: image with overlay */}
                <div className="relative md:w-1/2 w-full h-96 md:h-auto">
                    <Image
                        src={VetClinic}
                        alt="Veterinary"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-6">
                        <h1 className="text-white md:text-3xl font-extrabold mb-2">
                            Find Trusted Veterinary Clinics
                        </h1>
                        <p className="text-white md:text-xl">
                            Browse and connect with professional veterinary clinics near you.
                        </p>
                    </div>
                </div>

                {/* Right side: form */}
                <div className="md:max-w-md mx-auto w-full p-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-black mb-4">
                        Register Your Veterinary Clinic or Agro Store
                    </h2>
                    <form className="space-y-1">

                        {/* Clinic Image Upload */}
                        <div className="flex flex-col gap-2 mt-3">
                            <label className="text-sm font-medium text-gray-700">
                                Clinic Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                {...register("picture", {
                                    required: "Clinic image is required",
                                    onChange: (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        }
                                    },
                                })}
                                className="border border-gray-300 rounded-md p-2 text-sm"
                            />

                            {errors.picture && (
                                <span className="text-red-500 text-xs">
                                    {errors.picture.message as string}
                                </span>
                            )}

                            {/* Preview */}
                            {imagePreview && (
                                <div className="relative w-full h-40 rounded-md overflow-hidden border">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <FormInput
                            label="Name of Clinic/ AgroVet Store"
                            type="text"
                            focusLabel="Name of Clinic/ AgroVet Sore: "
                            isRequired
                            error={errors.clinic_name?.message}
                            {...register("clinic_name", {
                                required: "Clinic name is required",
                            })}
                        />

                        <FormInput
                            label="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            error={errors.email?.message}
                            focusLabel="Email Address (Required)"
                            isRequired
                        />

                        <Controller
                            name="clinic_speciality"
                            control={control}
                            rules={{ required: "At least one tag is required" }}
                            render={({ field }) => (
                                <TagSelect
                                    label="Speciality"
                                    focusLabel="Select one or more specialties your clinic offers:"
                                    isRequired
                                    options={[
                                        "Small Animal Practice",
                                        "Large Animal Practice",
                                        "Mixed Animal Practice",
                                        "Poultry Medicine",
                                        "Exotic Animal Medicine",
                                        "Wildlife Medicine",
                                        "Equine Medicine",
                                        "Farm Animal Medicine",
                                        "Aquatic / Fish Medicine",
                                        "Zoo Animal Medicine",
                                        "Veterinary Surgery",
                                        "Veterinary Dentistry",
                                        "Veterinary Dermatology",
                                        "Veterinary Cardiology",
                                        "Veterinary Ophthalmology",
                                        "Veterinary Neurology",
                                        "Veterinary Oncology",
                                        "Veterinary Orthopedics",
                                        "Veterinary Radiology / Imaging",
                                        "Veterinary Laboratory / Diagnostics",
                                        "Animal Reproduction / Theriogenology",
                                        "Preventive Medicine & Vaccination",
                                        "Animal Nutrition",
                                        "Emergency & Critical Care",
                                        "Animal Rehabilitation / Physiotherapy",
                                        "Veterinary Public Health",
                                        "Others"
                                    ]}
                                    error={errors.clinic_speciality?.message}
                                    onChange={(tags) => field.onChange(tags)}
                                />
                            )}
                        />

                        <FormGooglePlacesCustom
                            name="location"
                            control={control}
                            label="Location"
                            focusLabel="Location (Required):"
                            isRequired
                            error={errors.location?.message}
                            onLocationSelect={(loc: any) => setSelectedLocation(loc)}
                        />

                        <FormInput
                            label="Phone"
                            type="tel"
                            focusLabel="Phone (Required) :"
                            isRequired
                            error={errors.phone_number?.message}
                            {...register("phone_number", {
                                required: "Phone number is required",
                            })}
                        />

                        <div className="flex items-center border cursor-pointer bg-white border-gray-55 rounded-sm py-1 px-4">
                            {" "}
                            <input
                                id="agree-terms"
                                type="checkbox"
                                {...register("agreeTerms", {
                                    required: "You must agree to the terms and conditions",
                                })}
                                className="h-5 w-5 text-primary-400 cursor-pointer accent-primary-400 focus:ring-primary-400 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="agree-terms"
                                className="ml-4 text-sm font-normal cursor-pointer text-gray-55"
                            >

                                Confirm that you agree to our terms and conditions at Vet Konect
                            </label>{" "}
                        </div>

                        <div className="flex flex-col mt-4 gap-3">
                            <Button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                disabled={addClinicMutation.isLoading}
                                className="w-full py-6 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
                            >
                                {addClinicMutation.isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                        Processing...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}