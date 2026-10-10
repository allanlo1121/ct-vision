import type { UserProfile, UpdateUserProfileInput } from "./schemas"

export interface UserProfileRepository {
  findByUserId(userId: string): Promise<UserProfile | null>

  create(userId: string): Promise<UserProfile>

  update(userId: string, input: UpdateUserProfileInput): Promise<UserProfile>
}
