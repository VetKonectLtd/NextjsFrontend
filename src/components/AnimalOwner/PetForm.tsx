"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import { useRouter } from "next/navigation";
import FormSelect from "@/components/form/FormSelect";
import { Controller, useForm } from "react-hook-form";
import { PetOwner } from "@/types";
import { usePetOwnerService } from "@/services/petOwnerService";

type PetFormProps = {
  mode: "create" | "edit";
  pet?: PetOwner;
};

const PetForm = ({ mode, pet }: PetFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const { useAddPet, useUpdatePetOwner } = usePetOwnerService();
  const addPetMutation = useAddPet();

  const updatePetMutation = useUpdatePetOwner(
    (pet as Record<string, any>)?.pet?.id,
  );

  const {
    register,
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setValue,
    reset,
  } = useForm<PetOwner>();

  useEffect(() => {
    if (pet) {
      reset(
        {
          pet_name: (pet as Record<string, any>)?.pet.pet_name,
          specie: (pet as Record<string, any>).pet.specie,
          breed: (pet as Record<string, any>).pet.breed,
          age: (pet as Record<string, any>).pet.age,
          location: (pet as Record<string, any>).pet.location,
          sex: (pet as Record<string, any>).pet.sex,
          picture: null,
        },
        { keepDirty: true },
      );

      setPreview((pet as Record<string, any>).pet.picture_url ?? null);
    }
  }, [pet, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
      };
      reader.readAsDataURL(file);
      setValue("picture", file, { shouldValidate: true });
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
  };

  const handleBack = () => {
    router.back();
  };

  const onSubmit: any = async (data: PetOwner) => {
    const formData: any = new FormData();
    formData.append("pet_name", data.pet_name);
    formData.append("specie", data.specie);
    formData.append("breed", data.breed);
    formData.append("age", data.age.toString());
    formData.append("location", data.location);
    formData.append("sex", data.sex);

    if (data.picture instanceof File) {
      formData.append("picture", data.picture);
    }

    if (mode === "create") {
      addPetMutation.mutate(formData, {
        onSuccess: () => {
          router.push("/dashboard/pet");
        },
      });
    } else if (mode === "edit" && (pet as Record<string, any>).pet?.id) {
      updatePetMutation.mutate(formData, {
        onSuccess: () => {
          router.push("/dashboard/pet");
        },
      });
    }
  };
  return (
    <div className="w-11/12 mt-3 m-auto shadow-md border rounded-lg border-gray-225 bg-white">
      <div
        onClick={handleBack}
        className="flex items-center text-sm text-gray-55 hover:text-green-50 ml-4 mt-4"
      >
        <span className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-1 mr-3">
          <ChevronLeft className="w-5 h-5" />
        </span>{" "}
        Back
      </div>

      <div className="max-w-xs mt-5 mx-auto">
        <h1 className="text-3xl font-bold text-gray-55 text-center">
          Pet Details
        </h1>
        <p className="text-gray-500 text-sm w-1/2 m-auto text-center mb-6">
          You can add a new pet to your pet list
        </p>

        <form className="space-y-1">
          <FormInput
            label="Name of Pet "
            type="text"
            focusLabel="Name of Pet (Optional):"
            isRequired
            {...register("pet_name", {
              required: "Pet Name is required",
            })}
            error={errors.pet_name?.message}
            onChange={() => clearErrors("pet_name")}
          />

          <FormInput
            label="Specie"
            type="text"
            focusLabel="Specie (Optional) :"
            isRequired
            {...register("specie", {
              required: "Specie is required",
            })}
            error={errors.specie?.message}
            onChange={() => clearErrors("specie")}
          />

          <FormInput
            label="Breed"
            type="text"
            focusLabel="Breed (Optional):"
            isRequired
            {...register("breed", {
              required: "Breed is required",
            })}
            error={errors.breed?.message}
            onChange={() => clearErrors("breed")}
          />

          <Controller
            name="sex"
            control={control}
            rules={{ required: "Sex is required" }}
            render={({ field }) => (
              <FormSelect
                label="Sex"
                focusLabel="Sex (Required) :"
                isRequired
                searchable
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.sex && (
            <p className="text-red-600 text-sm">{errors.sex.message}</p>
          )}

          <FormInput
            label="Age"
            type="number"
            focusLabel="Age (Optional):"
            isRequired
            {...register("age", {
              required: "Age is required",
            })}
            error={errors.age?.message}
            onChange={() => clearErrors("age")}
          />

          <FormInput
            label="Location"
            type="text"
            focusLabel="Location (Optional):"
            isRequired
            {...register("location", {
              required: "Location is required",
            })}
            error={errors.location?.message}
            onChange={() => clearErrors("location")}
          />

          {/* Image Upload */}
          <div className="flex flex-col">
            {preview ? (
              <>
                <div className="w-full h-[150px] border-2 border-gray-200 rounded-md overflow-hidden mb-2 cursor-pointer flex items-center justify-center">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-sm text-left text-gray-55 underline"
                >
                  Remove Image
                </button>
              </>
            ) : (
              <>
                <label
                  htmlFor="store-image-upload"
                  className="w-full h-[150px] flex flex-col items-center justify-center border border-gray-55 rounded-md cursor-pointer mb-2"
                >
                  <span className="text-gray-400 text-sm">
                    Click to upload image
                  </span>
                </label>
                <input
                  id="store-image-upload"
                  type="file"
                  accept="image/*"
                  {...register("picture", {
                    required: mode === "create" ? "Image is required" : false,
                  })}
                  onChange={(e) => {
                    handleImageUpload(e);
                    clearErrors("picture");
                  }}
                  className="hidden"
                />
              </>
            )}
            {errors.picture?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.picture?.message}
              </p>
            )}
          </div>
          <div className=" pt-8">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={
                mode === "create"
                  ? addPetMutation.isLoading
                  : updatePetMutation.isLoading
              }
              className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
            >
              {mode === "create" ? (
                addPetMutation.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  "Add"
                )
              ) : updatePetMutation.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetForm;
