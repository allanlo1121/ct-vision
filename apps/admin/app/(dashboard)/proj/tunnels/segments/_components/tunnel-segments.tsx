// "use client"

// import { useState } from "react"
// import { Plus } from "lucide-react"
// import type { Tunnel } from "@workspace/proj/tunnel"
// import type { TunnelSegment } from "@workspace/proj/tunnel_segment"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@workspace/ui/components/card"
// import { Button } from "@workspace/ui/components/button"
// import { CreateSegmentDrawer } from "./create-drawer"
// import { SegmentTable } from "./segment-table"

// export function TunnelSegments({
//   tunnel,
//   segments,
// }: {
//   tunnel: Tunnel
//   segments: TunnelSegment[]
// }) {
//   const [createOpen, setCreateOpen] = useState(false)

//   return (
//     <>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between gap-4">
//           <div className="space-y-1.5">
//             <CardTitle>管片段</CardTitle>
//             <CardDescription>
//               管理隧道管片分段及对应的环号范围、管片尺寸。
//             </CardDescription>
//           </div>

//           <Button
//             size="sm"
//             onClick={() => setCreateOpen(true)}
//           >
//             <Plus className="size-4" />
//             新增管片段
//           </Button>
//         </CardHeader>

//         <CardContent>
//           <SegmentTable data={segments} />
//         </CardContent>
//       </Card>

//       <CreateSegmentDrawer
//         tunnel={tunnel}
//         open={createOpen}
//         onOpenChange={setCreateOpen}
//       />
//     </>
//   )
// }