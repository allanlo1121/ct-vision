
import type {
  TreeBaseNode,
  TreeWithChildren,
} from "@workspace/shared/tree"

export interface TreeNode extends TreeBaseNode {
  label: string
  hasChildren: boolean
  isLoaded?: boolean
  isEnabled?: boolean
}

export type TreeDataNode = TreeWithChildren<TreeNode>

export interface TreeInteractionProps {
  selectedId?: string
  expandedIds?: ReadonlySet<string>

  onSelect?: (node: TreeDataNode) => void
  onToggleExpand?: (node: TreeDataNode) => void
}

export interface TreeProps extends TreeInteractionProps {
  data: TreeDataNode[]
  loading?: boolean
}

export interface TreeNodeItemProps extends TreeInteractionProps {
  node: TreeDataNode
}