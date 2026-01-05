import { z } from "zod";

export const signUpSchema = z.object({
	email: z.email({ message: "Invalid email" }).optional(),
	phone: z
		.string()
		.length(10, "Invalid number Should be exactly 10 numbers")
		.optional(),
	password: z.string().min(8, "Password should be minimum 8 characters"),
});

export type ISignUpSchema = z.infer<typeof signUpSchema>;