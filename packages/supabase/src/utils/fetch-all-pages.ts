// export interface FetchAllPagesOptions<T> {
//   pageSize?: number
//   fetchPage: (
//     from: number,
//     to: number
//   ) => Promise<{
//     data: T[] | null
//     error: unknown
//   }>
// }

// /**
//  * 自动分页获取所有数据
//  */
// export async function fetchAllPages<T>({
//   pageSize = 1000,
//   fetchPage,
// }: FetchAllPagesOptions<T>): Promise<T[]> {
//   if (!Number.isInteger(pageSize) || pageSize <= 0) {
//     throw new Error("pageSize 必须是正整数")
//   }

//   const results: T[] = []
//   let from = 0

//   while (true) {
//     const to = from + pageSize - 1

//     const { data, error } = await fetchPage(from, to)

//     if (error) {
//       throw error
//     }

//     const rows = data ?? []

//     results.push(...rows)

//     // 不足一页，说明已经查询完毕
//     if (rows.length < pageSize) {
//       break
//     }

//     from += pageSize
//   }

//   return results
// }

interface FetchAllPagesOptions<T> {
  pageSize?: number
  fetchPage: (from: number, to: number) => Promise<T[]>
}

export async function fetchAllPages<T>({
  pageSize = 1000,
  fetchPage,
}: FetchAllPagesOptions<T>): Promise<T[]> {
  if (!Number.isInteger(pageSize) || pageSize <= 0) {
    throw new Error("pageSize 必须是正整数")
  }

  const results: T[] = []
  let from = 0

  while (true) {
    const to = from + pageSize - 1

    const data = await fetchPage(from, to)

    results.push(...data)

    if (data.length < pageSize) {
      break
    }

    from += pageSize
  }

  return results
}
