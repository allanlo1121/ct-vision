

export function extractTbmTimestamp(payload: any): string {
  if (!payload) return new Date().toISOString();

  // ① 优先使用 PLC 发送的 recorded_at
  if (payload.recorded_at) {
    return new Date(payload.recorded_at).toISOString();
  }

  // ② 再用 ts（一般是毫秒时间戳）
  if (payload.ts) {
    return new Date(payload.ts).toISOString();
  }

  // ③ 兜底用系统时间
  return new Date().toISOString();
}
export function extractTbmTimestampMs(payload: any): number {
  const now = Date.now();

  if (!payload) return now;

  // ① 优先使用 PLC/设备发送的 recorded_at（字符串或数字都兼容）
  if (payload.recorded_at) {
    const t = new Date(payload.recorded_at).getTime();
    return Number.isFinite(t) ? t : now;
  }

  // ② 再用 ts（一般是毫秒时间戳）
  if (payload.ts) {
    const t = Number(payload.ts); // 避免 ts 不是 number 的情况
    return Number.isFinite(t) ? t : now;
  }

  // ③ 兜底用当前时间
  return now;
}

// -----------------------------
// 提取 ring（盾构机环号）
// 一般来自 payload.s100100008
// -----------------------------
export function extractRingNo(payload: any): number | null {
  if (!payload) return null;

  const candidate =
    payload.s100100008 ??
    payload.ring ??
    payload.RING ??
    null;

  if (candidate == null) return null;

  const num = Number(candidate);
  return Number.isFinite(num) ? num : null;
}

export function extractChainage(payload: any): number | null {
  if (!payload) return null;

  const candidate =
    payload.s100100005 ??
    payload.chainage ??
    payload.CHAINAGE ??
    null;

  if (candidate == null) return null;

  const num = Number(candidate);
  return Number.isFinite(num) ? num : null;
}


export function normalizePayload(raw: Record<string, any>): Record<string, number> {

  const ts = extractTbmTimestampMs(raw);        // 毫秒
  const timestamp = extractTbmTimestamp(raw);   // 毫秒/秒 OR ISO 转数字


  const normalized: Record<string, number> = {
    ts,
  };

  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "number") {
      normalized[key] = value;
    } else if (typeof value === "boolean") {
      normalized[key] = value ? 1 : 0;
    }
  }

  return normalized;
}

