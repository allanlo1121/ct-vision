import { z } from "zod";

export const UserProfileSchema = z.object({
  user_id: z.uuid(),

  display_name: z.string().nullable(),
  avatar_path: z.string().nullable(),

  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }).nullable(),
});

export const SaveUserProfileSchema = UserProfileSchema.pick({ 
  display_name: true,
  avatar_path: true,
});

export type SaveUserProfileInput =
  z.input<typeof SaveUserProfileSchema>;

// export const UpdateUserProfileSchema =
//   UserProfileSchema.pick({
//     display_name: true,
//     avatar_path: true,
//   }).partial();

export type UserProfile =
  z.infer<typeof UserProfileSchema>;

// export type UpdateUserProfileInput =
//   z.input<typeof UpdateUserProfileSchema>;