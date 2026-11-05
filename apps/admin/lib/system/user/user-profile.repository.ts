import { createClient } from "@workspace/supabase/server"
import { UserProfileSchema } from "@workspace/system/user-profile"

import { assertNoError } from "@workspace/supabase/errors"

import type {
  UserProfileRepository,
  SaveUserProfileInput,
  UserProfile,
} from "@workspace/system/user-profile"

export const userProfileRepository: UserProfileRepository = {
  async findByUserId(userId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()

    assertNoError(error)

    return data
  },

  async save(
    userId: string,
    input: SaveUserProfileInput
  ): Promise<UserProfile> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("user_profiles")
      .upsert(
        {
          user_id: userId,
          ...input,
        },
        {
          onConflict: "user_id",
        }
      )
      .select()
      .single()

    assertNoError(error)

    return UserProfileSchema.parse(data)
  },
}
