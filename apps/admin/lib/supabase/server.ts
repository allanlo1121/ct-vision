// import { cookies } from "next/headers"

// import {
//   createSupabaseServerClient,
//   type SupabaseServerClient,
// } from "../../../../packages/supabase/src/server.back"

// export async function createClient(): Promise<SupabaseServerClient> {
//   const cookieStore = await cookies()

//   return createSupabaseServerClient({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     publicKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,

//     cookies: {
//       getAll() {
//         return cookieStore.getAll()
//       },

//       setAll(cookiesToSet) {
//         try {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             cookieStore.set(name, value, options)
//           })
//         } catch {
//           // Server Component 中可能无法写 Cookie。
//           // Session refresh 后续交给 proxy.ts。
//         }
//       },
//     },
//   })
// }
