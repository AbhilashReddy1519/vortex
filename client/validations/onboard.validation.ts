import z from "zod";
import { imageFileSchema } from "@/utils/imageFileSchema";

export const fullNameSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(1, "First name is required")
		.min(3, "First name must be at least 3 characters"),
	lastName: z
		.string()
		.trim()
		.min(1, "Last name is required")
		.min(3, "First name must be at least 3 characters"),
});


export const locationSchema = z.object({
  country: z.string().trim().min(1, "Country is required"),
	city: z.string().trim().min(1, "City is required"),
});

export const pictureSchema = z.object({
	profile_picture: imageFileSchema.optional(),
	cover_picture: imageFileSchema.optional(),
});



export const usernameSchema = z.object({
  username: z
  .string()
  .trim()
  .min(1, "Username is required")
  .min(4, "Username must be more than 4 characters"),
});


/** --- Step Data Types --- */
export type IFullNameSchema = z.infer<typeof fullNameSchema>;
export type ILocationSchema = z.infer<typeof locationSchema>;
export type IPictureSchema = z.infer<typeof pictureSchema>;
export type IUsernameSchema = z.infer<typeof usernameSchema>;


/** --- Union of All Step Data --- */
// export type StepFormData = IFullNameSchema | ILocationSchema | IPictureSchema | IUsernameSchema;
export type StepFormData = Partial<OnboardingFormData>;


export type OnboardingFormData = IFullNameSchema & ILocationSchema & IPictureSchema & IUsernameSchema;

