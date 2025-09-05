import { z } from "zod";

// Poultry schema
export const poultrySchema = z.object({
  livestockCategory: z.literal("Poultry"),
  birdsType: z.string().min(1, "Birds type is required"),
  feedType: z.string().min(1, "Feed type is required"),
  numberOfWeeks: z.number().min(1, "Number of weeks must be at least 1"),
  numberOfBirds: z.number().min(1, "Number of birds must be at least 1"),
});

// Fishes schema
export const fishesSchema = z.object({
  livestockCategory: z.literal("Fishes"),
  sizeOfFish: z.number().min(1, "Size of fish is required"),
  numberOfFish: z.number().min(1, "Number of fish must be at least 1"),
});

// Pigs schema
export const pigsSchema = z.object({
  livestockCategory: z.literal("Pigs"),
  numberOfPigs: z.number().min(1, "Number of pigs must be at least 1"),
});

// Union schema for all livestock types
export const feedCalculatorSchema = z.discriminatedUnion("livestockCategory", [
  poultrySchema,
  fishesSchema,
  pigsSchema,
]);

// Base form type for initial state
export const baseFormSchema = z.object({
  livestockCategory: z.string().min(1, "Livestock category is required"),
});

export type FeedCalculatorFormData = z.infer<typeof feedCalculatorSchema>;
export type BaseFormData = z.infer<typeof baseFormSchema>;

// Livestock options
export const livestockOptions = [
  { value: "Poultry", label: "Poultry" },
  { value: "Fishes", label: "Fishes" },
  { value: "Pigs", label: "Pigs" },
];

// Birds type options for Poultry
export const birdsTypeOptions = [
  { value: "Broilers", label: "Broilers" },
  { value: "Layers", label: "Layers" },
];

// Feed type options for different birds
export const feedTypeOptions = {
  Broilers: [
    { value: "Starter", label: "Starter" },
    { value: "Finisher", label: "Finisher" },
  ],
  Layers: [
    { value: "Chick Mash", label: "Chick Mash" },
    { value: "Growers Mash", label: "Growers Mash" },
    { value: "Layers Mash/Pellet", label: "Layers Mash/Pellet" },
  ],
};
