import { RuntimeUser } from "../types";
import { appErrors } from "@/lib/shared/contracts";

export async function queryRuntimeUser(): Promise<RuntimeUser> {
  const { getRuntimeUser } = await import("../repositories/system.repository");
  const { mapRuntimeUser } = await import("../mapper/mapper");
  const row = await getRuntimeUser();

  if (!row) {
    throw appErrors.notFound("未查询到运行时用户信息");
  }

  return mapRuntimeUser(row);
}
