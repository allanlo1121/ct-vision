import { createContext } from "react";
import type { MenuNode } from "@/lib/navigation";

export const MenuContext = createContext<MenuNode[] | undefined>(undefined);
