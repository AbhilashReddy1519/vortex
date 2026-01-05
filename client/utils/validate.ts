import { ZodError, ZodType } from "zod";

export async function validate<T>(
	schema: ZodType<T>,
	payload: unknown,
): Promise<
	| { success: true; data: T }
	| { success: false; error: { field: string; message: string }[] }
> {
	const result = schema.safeParse(payload);
	if (result.success) {
		return {
			success: true,
			data: result.data,
		};
	}
	return {
		success: false,
		error: formatZodErrors(result.error),
	};
}



function formatZodErrors(error: ZodError): { field: string; message: string }[] {
	return error.issues.map((err) => ({
		field: err.path.join("."), // e.g. "email"
		message: err.message,
	}));
}
