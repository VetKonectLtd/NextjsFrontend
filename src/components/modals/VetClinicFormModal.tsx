import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormInput from "../form/FormInput";
import TagSelect from "../form/TagSelect";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import Image from "next/image";
import { Icon1, Icon2, Icon3 , Arrow} from "@/app/assets/icons/auth";
import progressItem from "./progressItem";

const VeterinarianFormModal = ({ progressOpen, setProgressOpen }: any) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleSubmit = () => {
        setProgressOpen(false);
        setSuccessOpen(true);
    };

    return (
        <>
           
            <Dialog open={progressOpen} onOpenChange={setProgressOpen}>
                <DialogContent className="max-w-sm rounded-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="text-center px-7 m-auto">
                            <DialogTitle className="font-extrabold text-2xl">
                                Select Category
                            </DialogTitle>
                            <DialogDescription>
                                Choose a user category that best explains your user type.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="flex items-center max-w-1/2 m-auto text-center justify-center gap-2 mb-8">
                        {progressItem(Icon1, "Account Details", 0)}
                        <Image
                            src={Arrow}
                            alt="arrow"
                            className="object-contain w-3 h-3 filter-green"
                        />
                        {progressItem(Icon2, "Personal Info", 1)}
                        <Image
                            src={Arrow}
                            alt="arrow"
                            className="object-contain w-3 h-3 filter-gray"
                        />
                        {progressItem(Icon3, "Verify Account", 2)}
                    </div>
                    <FormInput
                        label="Practicing License Number"
                        type="text"
                        focusLabel="Practicing License Number (Required) :"
                        isRequired
                    />
                    <TagSelect
                        label="Specialty"
                        focusLabel="Specialty Required :"
                        isRequired
                        options={[
                            "Small Animal",
                            "Large Animal",
                            "Exotic",
                            "Wildlife",
                            "Others",
                        ]}
                        onChange={(tags) => setSelectedTags(tags)}
                    />
                    <FormInput
                        label="List them"
                        type="text"
                        focusLabel="List them (Required) :"
                        isRequired
                    />
                     <FormInput
                        label="Phone"
                        type="tel"
                        focusLabel="Phone (Required) :"
                        isRequired
                    />
                    <FormInput
                        label="Address"
                        type="text"
                        focusLabel="Address (Required) :"
                        isRequired
                    />

                    <div className="flex items-center border cursor-pointer bg-white border-gray-55 rounded-sm py-1 px-4">
                        {" "}
                        <input
                            id="agree-terms"
                            type="checkbox"
                            className="h-5 w-5 text-primary-400 cursor-pointer accent-primary-400 focus:ring-primary-400 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="agree-terms"
                            className="ml-4 text-sm font-normal cursor-pointer text-gray-55"
                        >
                            {" "}
                            Confirm that you agree to our terms and conditions at Vet
                            Konect{" "}
                        </label>{" "}
                    </div>

                    <div className="flex flex-col mt-4 gap-3">
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-5 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                        >
                            Proceed
                        </Button>

                        <Button
                            type="button"
                            className="flex-1 py-3 text-gray-55 font-medium rounded-lg bg-[#FFDAB0] hover:bg-[#ffdab0ef] transition"
                        >
                            Back
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <SuccessModal successOpen={successOpen} setSuccessOpen={setSuccessOpen} />
        </>
    );
};

export default VeterinarianFormModal;


