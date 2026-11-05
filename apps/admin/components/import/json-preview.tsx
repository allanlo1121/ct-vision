"use client";

export default function JsonPreview({ rows }: { rows: any[] }) {
  return (
    <div className="max-h-[400px] overflow-auto border rounded p-4 text-xs">
      <pre>{JSON.stringify(rows.slice(0, 10), null, 2)}</pre>

      <div className="mt-2 text-muted-foreground">共 {rows.length} 条数据</div>
    </div>
  );
}
