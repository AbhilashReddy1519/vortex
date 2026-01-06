import { z } from "zod";

export const signUpSchema = z.object({
	email: z.email({ message: "Invalid email" }),
	password: z.string().min(8, "Password should be minimum 8 characters"),
});

export type ISignUpSchema = z.infer<typeof signUpSchema>;