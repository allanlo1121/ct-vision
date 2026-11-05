import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@workspace/ui/components/sidebar"
import { TreeProps } from "./types";
import { TreeNodeItem } from "./tree-node-item";

export function Tree({
  data,
  selectedId,
  expandedIds,
  onSelect,
  onToggleExpand,
}: TreeProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {data.map((node) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
