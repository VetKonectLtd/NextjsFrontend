"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import { useRouter } from "next/navigation";
import FormSelect from "@/components/form/FormSelect";

const NewLivestockPage = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [sex, setSex] = useState<string>(""); 
    const router = useRouter();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
    };

    const handleBack = () => {
        router.back();
    };

    const onSubmit = () => {
        console.log("Form Submitted ✅");
    };

    return (
        <div className="min-h-screen w-11/12 mt-3 m-auto shadow-md border rounded-lg border-gray-225 bg-white">
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
                    Farm Details
                </h1>
                <p className="text-gray-500 text-sm w-1/2 m-auto text-center mb-6">
                    You can add a new farm to your farm list
                </p>

                <form className="space-y-1">
                    <FormInput
                        label="Name of Poultry"
                        type="text"
                        focusLabel="Name of Poultry"
                        isRequired
                    />

                    <FormInput
                        label="Location / Address"
                        type="text"
                        focusLabel="Location / Address"
                        isRequired
                    />
                    <FormInput
                        label="Number of Workers"
                        type="number"
                        focusLabel="Number of Workers"
                        isRequired
                    />

                    <FormInput
                        label="Type of livestock"
                        type="text"
                        focusLabel="Type of livestock"
                        isRequired
                    />
                    <FormInput
                        label="Number of Livestock"
                        type="number"
                        focusLabel="Number of Livestock"
                        isRequired
                    />
                     <FormSelect
                        label="Sex"
                        focusLabel="Sex (Optional):"
                        isRequired
                        searchable
                        options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                        ]}
                        value={sex}
                        onChange={(value) => setSex(value)}
                    />

                     <FormInput
                        label="Age"
                        type="number"
                        focusLabel="Age"
                        isRequired
                    />

                    <FormInput
                        label="Farm Description"
                        type="text"
                        focusLabel="Farm Description"
                        isRequired
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
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </>
                        )}
                    </div>
                    <div className=" pt-8">
                        <button
                            type="submit"
                            className="w-full py-3 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewLivestockPage;
