// import { cache } from "react"

// import { createClient } from "@/lib/supabase/server"

// import type { AuthContext } from "@workspace/auth/context"
// import { createAuthContext } from "@workspace/auth/context"

// import { z } from "zod"

// export const authContextSchema = z.object({
//   user: z.object({
//     userId: z.uuid(),
//     email: z.email(),
//     displayName: z.string(),
//     avatarUrl: z.string().nullable(),
//   }),

//   roles: z.array(z.string()),

//   permissions: z.array(z.string()),
// })

// export type AuthContextSchema = z.infer<typeof authContextSchema>

// export const getAuthContext = cache(async (): Promise<AuthContext | null> => {
//   const supabase = await createClient()


//   const { data, error } = await supabase
//     .schema("api")
//     .rpc("get_current_auth_context")

//   if (error) {
//     throw new Error(`获取用户资料失败: ${error.message}`)
//   }

//   if (data === null) {
//     return null
//   }
//   const parsed = authContextSchema.parse(data)
//   return createAuthContext(parsed)
// })

// export const getDataScope = cache(async (): Promise<DataScope> => {
//   const supabase = await createClient()

//   const { data, error } = await supabase
//     .schema("rbac")
//     .rpc("get_current_data_scope")
//     .single()

//   if (error) {
//     throw new Error(`获取用户数据范围失败: ${error.message}`)
//   }

//   return {
//     allOrganizations: data.all_organizations ?? false,

//     organizationIds: data.organization_ids ?? [],

//     scopeCodes: data.scope_codes ?? [],
//   }
// })

// export const getAuthorization = cache(
//   async (): Promise<AuthorizationResult> => {
//     const supabase = await createClient()

//     const { data, error } = await supabase
//       .schema("rbac")
//       .rpc("get_current_authorization")
//       .single()

//     if (error) {
//       throw new Error(`获取用户角色权限失败: ${error.message}`)
//     }

//     return {
//       roles: data.roles ?? [],
//       permissions: data.permissions ?? [],
//     }
//   }
// )

// export async function getAuthContext(): Promise<AuthContext | null> {
//   const user = await getCurrentUser()

//   if (!user) {
//     return null
//   }

//   const [authorization] = await Promise.all([
//     getAuthorization(),
//     getDataScope(),
//   ])

//   return {
//     user,

//     roles: authorization.roles,

//     permissions: authorization.permissions,

//     dataScope,
//   }
// }

// export async function logoutAction() {
//   const supabase = await createClient()
//   await supabase.auth.signOut()
// }
