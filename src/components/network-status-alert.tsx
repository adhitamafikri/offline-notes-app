"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useNetworkStatus } from "@/hooks/use-network-status";

export function NetworkStatusAlert(): React.ReactNode {
  const { networkStatus } = useNetworkStatus();

  const alertClass = useMemo(() => {
    const baseClass = "fixed top-0 right-0 z-50 shadow-sm p-4 mt-2 mr-2";
    if (networkStatus.isOnline) {
      return cn(baseClass, "bg-green-50");
    }

    return cn(baseClass, "bg-red-50");
  }, [networkStatus.isOnline]);

  return (
    <div className={alertClass}>
      {networkStatus.isOnline ? <p>You are online</p> : <p>You are offline</p>}
    </div>
  );
}
