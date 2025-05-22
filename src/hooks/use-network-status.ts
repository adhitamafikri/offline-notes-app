import { useContext } from "react";
import {
  type INetworkStatusContext,
  NetworkStatusContext,
} from "@/contexts/network-status.context";

export function useNetworkStatus(): { networkStatus: INetworkStatusContext } {
  const networkStatus = useContext<INetworkStatusContext | undefined>(
    NetworkStatusContext
  );

  if (!networkStatus) {
    throw new Error(
      "NetworkStatusContext must be used within a NetworkStatusProvider"
    );
  }

  return { networkStatus };
}
