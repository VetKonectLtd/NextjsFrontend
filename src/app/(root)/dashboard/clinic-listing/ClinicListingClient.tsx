"use client";
import { ClinicCart } from "@/app/assets/images";
import FormGooglePlacesCustom from "@/components/form/FormGooglePlacesCustom";
import FormInput from "@/components/form/FormInput";
import TagInput from "@/components/form/TagInput";
import TagSelect from "@/components/form/TagSelect";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useAuthService } from "@/services/authService";
import { useVeterinaryClinicService } from "@/services/veterinaryClinicService";
import { VetClinicListing } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ClinicListingClient() {
    
        const { useAddVetClinic } = useVeterinaryClinicService();
        const { useCurrentUser } = useAuthService();
        const { coordinates } = useGeolocation();
    
        const addVetClinicMutation = useAddVetClinic();
        const { data: user } = useCurrentUser(true);
    
        const {
            register,
            handleSubmit,
            setValue,
            control,
            formState: { errors, isValid },
        } = useForm<VetClinicListing>();
    
        const [selectedLocation, setSelectedLocation] = useState<{
            latitude: number;
            longitude: number;
        } | null>(null);
    
        useEffect(() => {
            if (selectedLocation) {
                setValue("latitude", String(selectedLocation.latitude as any));
                setValue("longitude", String(selectedLocation.longitude as any));
            }
            if (user) {
                setValue(
                    "user_id",
                    (user as Record<string, any>)?.data?.profile?.user?.id,
                );
            }
        }, [setValue, selectedLocation, user]);
    
        const onSubmit = (data: VetClinicListing) => {
           
            // addVetClinicMutation.mutate(data, {
            //     onSuccess: () => {
            //     },
            // });
        };

    return ( 
        <div className="min-h-screen w-11/12 mt-3 m-auto py-10 flex items-center justify-center">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full">
                {/* Left side: image with overlay */}
                <div className="relative md:w-1/2 w-full h-96 md:h-screen">
                    <Image
                        src={ClinicCart}
                        alt="Veterinary"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-start p-6">
                        <h1 className="text-white md:text-3xl font-extrabold mb-2">
                            Early treatment matters.
                        </h1>
                        <p className="text-white md:text-3xl font-extrabold">
                            Every pet deserves care.
                        </p>
                    </div>
                </div>

                {/* Right side: form */}
                <div className="md:max-w-md mx-auto w-full p-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-black mb-4">
                        Veterinary Hospital / <br /> Clinic Listing
                    </h2>
                    <form className="space-y-1">
                        
                        <FormInput
                            label="Name of Clinic/ AgroVet Sore"
                            type="text"
                            focusLabel="Name of Clinic/ AgroVet Sore: "
                            isRequired
                            error={errors.clinic_name?.message}
                            {...register("clinic_name", {
                                required: "Clinic name is required",
                            })}
                        />

                         <FormGooglePlacesCustom
                            name="address"
                            control={control}
                            label="Address"
                            focusLabel="Address (Required):"
                            isRequired
                            error={errors.address?.message}
                            onLocationSelect={(loc: any) => setSelectedLocation(loc)}
                        />

                         <FormInput
                            label="Owner"
                            type="text"
                            focusLabel="Owner: "
                            isRequired
                            error={errors.owner_name?.message}
                            {...register("owner_name", {
                                required: "Owner is required",
                            })}
                        />

                         <FormInput
                            label="Phone"
                            type="tel"
                            focusLabel="Phone (Required) :"
                            isRequired
                            error={errors.contact_num?.message}
                            {...register("contact_num", {
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
                                disabled={addVetClinicMutation.isLoading}
                                className="w-full py-6 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
                            >
                                {addVetClinicMutation.isLoading ? (
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