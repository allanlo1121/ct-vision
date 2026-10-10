// menu/MenuProvider.tsx
"use client";

import { AppContextType } from "./types";
import { AppContext } from "./AppContext";

export function AppContextProvider({
  children,
  initialContext,
}: {
  children: React.ReactNode;
  initialContext: AppContextType;
}) {
  return <AppContext.Provider value={initialContext}>{children}</AppContext.Provider>;
}
