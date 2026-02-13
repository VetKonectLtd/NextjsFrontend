import { z } from "zod";
import {useDiseasePredict}  from "@/services/diseasePredictService"

// Base schema for disease predictor
export const diseasePredictorSchema = z.object({
  animalSpecies: z.string().min(1, "Animal species is required"),
  symptoms: z.array(z.string()).min(1, "At least one symptom is required"),
  image: z.any().optional(), // For file upload
});

export type DiseasePredictorFormData = z.infer<typeof diseasePredictorSchema>;



// Animal species options
export const animalSpeciesOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Poultry", label: "Poultry" },
  { value: "Swine", label: "Swine" },
  { value: "Goat", label: "Goat" },
  { value: "Cattle", label: "Cattle" },
];

// Available symptoms for selection
export const availableSymptoms = [
  "Loss of Appetite",
  "Weight Loss", 
  "Diarrhea",
  "Inflammation",
  "Rashes",
  "Abnormal Posture",
  "Inflammation in the limbs",
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
];

// Dummy disease predictions based on symptoms
export const diseasePredictions: Record<string, string[]> = {
  "Loss of Appetite,Weight Loss,Diarrhea,Inflammation": ["Coccidiosis"],
  "Loss of Appetite,Weight Loss": ["Malnutrition", "Parasitic Infection"],
  "Diarrhea,Inflammation": ["Gastroenteritis", "Inflammatory Bowel Disease"],
  "Fever,Vomiting,Lethargy": ["Viral Infection", "Bacterial Infection"],
  "Coughing,Difficulty Breathing": ["Respiratory Infection", "Pneumonia"],
  "Skin Irritation,Hair Loss": ["Dermatitis", "Fungal Infection"],
  "Limping,Swelling": ["Arthritis", "Injury"],
  default: ["General Health Concern"],
};
