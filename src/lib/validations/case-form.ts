import { z } from "zod";

// Case form validation schema
export const caseFormSchema = z.object({
  // Step 1: Basic Case Details
  caseTitle: z.string().min(1, "Case title is required"),
  
  // Client Details
  clientName: z.string().min(1, "Client name is required"),
  clientPhoneNumber: z.string().min(1, "Client phone number is required"),
  petOrFarm: z.enum(["Pet", "Farm"], {
    required_error: "Please select Pet or Farm",
  }),

  // Step 2: Pet/Farm Details (conditional based on petOrFarm)
  petName: z.string().optional(),
  farmName: z.string().optional(),
  species: z.string().optional(),
  typeOfLivestock: z.string().optional(),
  breed: z.string().optional(),
  numberOfLivestock: z.number().optional(),
  age: z.number().min(0, "Age must be positive").optional(),
  numberOfWorkers: z.number().min(0, "Number of workers must be positive").optional(),
  sex: z.enum(["Male", "Female"], {
    required_error: "Please select sex",
  }).optional(),
  petNumber: z.string().optional(),
  location: z.string().optional(),
  otherDetails: z.string().optional(),

  // Step 3: Disease Records
  dateOccurred: z.string().min(1, "Date occurred is required"),
  history: z.string().optional(),
  clinicalSigns: z.array(z.string()).min(1, "At least one clinical sign is required"),
  tentativeDiagnosis: z.string().optional(),
  differentialDiagnosis: z.string().optional(),
  diseaseClassification: z.string().optional(),
  labConfirmed: z.enum(["Yes", "No"], {
    required_error: "Please select lab confirmation status",
  }).optional(),
  mortality: z.enum(["None", "Low", "Medium", "High"], {
    required_error: "Please select mortality level",
  }).optional(),
  treatmentRegimen: z.string().optional(),

  // Step 4: Clinic Location
  clinicPhysicalAddress: z.string().min(1, "Clinic address is required"),
  mobileVeterinarian: z.string().min(1, "Veterinarian name is required"),

  // Images
  images: z.array(z.any()).optional(),
});

export type CaseFormData = z.infer<typeof caseFormSchema>;

// Clinical signs options
export const clinicalSignsOptions = [
  "Loss of Appetite",
  "Weight Loss",
  "Diarrhea",
  "Inflammation",
  "Fever",
  "Vomiting",
  "Lethargy",
  "Coughing",
  "Difficulty Breathing",
  "Excessive Thirst",
  "Frequent Urination",
  "Skin Irritation",
  "Hair Loss",
  "Limping",
  "Swelling",
  "Discharge from Eyes/Nose",
  "Behavioral Changes",
  "Respiratory Distress",
  "Decreased Production",
  "Sudden Death",
  "Hemorrhage",
];

// Species options
export const speciesOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Cattle", label: "Cattle" },
  { value: "Goat", label: "Goat" },
  { value: "Sheep", label: "Sheep" },
  { value: "Pig", label: "Pig" },
  { value: "Chicken", label: "Chicken" },
  { value: "Duck", label: "Duck" },
  { value: "Turkey", label: "Turkey" },
  { value: "Horse", label: "Horse" },
  { value: "Rabbit", label: "Rabbit" },
];

// Livestock types
export const livestockTypes = [
  "Poultry",
  "Cattle",
  "Swine", 
  "Goats",
  "Sheep",
  "Fish",
  "Rabbits",
];

// Disease classification options
export const diseaseClassificationOptions = [
  "Infectious Disease",
  "Parasitic Disease", 
  "Nutritional Disorder",
  "Metabolic Disorder",
  "Genetic Disorder",
  "Traumatic Injury",
  "Toxic Condition",
  "Neoplastic Disease",
  "Immune-mediated Disease",
  "Behavioral Disorder",
];

// Validation helpers for conditional fields
export const validateStep1 = (data: Partial<CaseFormData>) => {
  return !!(data.caseTitle && data.clientName && data.clientPhoneNumber && data.petOrFarm);
};

export const validateStep2 = (data: Partial<CaseFormData>) => {
  if (data.petOrFarm === "Pet") {
    return !!(data.petName && data.species && data.breed && data.age && data.sex);
  } else if (data.petOrFarm === "Farm") {
    return !!(data.farmName && data.typeOfLivestock && data.numberOfLivestock && data.numberOfWorkers);
  }
  return false;
};

export const validateStep3 = (data: Partial<CaseFormData>) => {
  return !!(data.dateOccurred && data.clinicalSigns && data.clinicalSigns.length > 0);
};

export const validateStep4 = (data: Partial<CaseFormData>) => {
  return !!(data.clinicPhysicalAddress && data.mobileVeterinarian);
};
