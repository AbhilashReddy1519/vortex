import z from 'zod';
export const serverImageSchema = z
  .object({
    mimetype: z
      .string()
      .refine(
        type => ['image/png', 'image/jpeg', 'image/webp'].includes(type),
        'Invalid image type'
      ),
    size: z.number().max(5 * 1024 * 1024, 'Image too large'),
  })
  .partial();

export const onboardSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .min(3, 'First name must be at least 3 characters'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .min(3, 'First name must be at least 3 characters'),
  country: z.string().trim().min(1, 'Country is required'),
  city: z.string().trim().min(1, 'City is required'),
  // profile_picture: serverImageSchema.optional(),
  // cover_picture: serverImageSchema.optional(),
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .min(4, 'Username must be more than 4 characters'),
});

// TODO: implement file validations also -> 08/02...
export type IOnboardSchema = z.infer<typeof onboardSchema>;
