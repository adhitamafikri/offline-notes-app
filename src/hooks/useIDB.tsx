"use client";

import { AppIDB } from "@/lib/idb";
import { useEffect, useState } from "react";

export function useIDB(): { idbInstance: AppIDB | null } {
  const [idbInstance, setIdbInstance] = useState<AppIDB | null>(null);

  useEffect(() => {
    if (!idbInstance) {
      setIdbInstance(new AppIDB());
    }
  }, [idbInstance]);

  return { idbInstance };
}
