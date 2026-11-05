import type { TreeNodeItemProps } from "./types"

export function TreeNodeItem({
  node,

  selectedId,

  expandedIds = new Set(),

  onSelect,

  onToggleExpand,
}: TreeNodeItemProps) {
  const isExpanded = expandedIds.has(node.id)

  const hasChildren = node.children && node.children.length > 0

  // =====================================
  // select
  // =====================================

  function handleSelect() {
    onSelect?.(node)
  }

  // =====================================
  // expand
  // =====================================

  function handleToggleExpand(e: React.MouseEvent) {
    e.stopPropagation()

    onToggleExpand?.(node)
  }

  return (
    <div className="ml-1 text-sm">
      <div
        className={`flex cursor-pointer items-center gap-1 py-1 select-none ${selectedId === node.id ? "font-bold text-blue-500" : ""} `}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button
            type="button"
            className="w-4 shrink-0 text-xs"
            onClick={handleToggleExpand}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        ) : (
          <span className="w-4" />
        )}

        <span>{node.label}</span>
      </div>

      {isExpanded && hasChildren && (
        <div className="ml-4">
          {node.children &&
            node.children.map((child) => (
              <TreeNodeItem
                key={child.id}
                node={child}
                selectedId={selectedId}
                expandedIds={expandedIds}
                onSelect={onSelect}
                onToggleExpand={onToggleExpand}
              />
            ))}
        </div>
      )}
    </div>
  )
}
