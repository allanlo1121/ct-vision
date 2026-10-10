// lib/runtime/services/runtime-user.service.ts

import { createClient } from "@/lib/infra/supabase/server";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import type { RuntimeUserRow } from "../types";

export async function getRuntimeUser(): Promise<RuntimeUserRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("v_runtime_user").select("*");

  console.log("runtime user rows:", data?.length);

  console.log("runtime user error:", error);

  assertNoError(error);

  return data?.[0] ?? null;
}
