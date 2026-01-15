import z from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_MIME = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".webp"];

export const imageFileSchema = z.custom<File>(
	(file) => {
		if (!file) return false;
		if (typeof file !== "object") return false;
		if (!("name" in file)) return false;
		if (!("size" in file)) return false;
		if (!("type" in file)) return false;

		const f = file as File;

		// Size check
		if (f.size > MAX_SIZE) return false;

		// MIME type check
		if (!ALLOWED_MIME.includes(f.type)) return false;

		// Extension check (prevents renamed .exe → .png attacks)
		const ext = f.name.toLowerCase().slice(f.name.lastIndexOf("."));
		if (!ALLOWED_EXT.includes(ext)) return false;

		return true;
	},
	{
		message: "File must be an image (.png, .jpg, .jpeg, .webp) under 5MB",
	},
);
