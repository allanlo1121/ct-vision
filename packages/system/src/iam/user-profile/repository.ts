import type { UserProfile, SaveUserProfileInput } from "./schemas"

export interface UserProfileRepository {
  findByUserId(userId: string): Promise<UserProfile | null>

  save(userId: string, input: SaveUserProfileInput): Promise<UserProfile>
}
