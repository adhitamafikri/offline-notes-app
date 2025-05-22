"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface INetworkStatusContext {
  isOnline: boolean;
}

export const NetworkStatusContext = createContext<INetworkStatusContext | undefined>(undefined);

export const NetworkStatusProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);

  const updateOnlineStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
  }, []);

  
  useEffect(() => {
    console.log("Is this app online?", isOnline);
  }, [isOnline]);

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [updateOnlineStatus]);

  const contextValue = useMemo(() => ({ isOnline }), [isOnline]);

  return (
    <NetworkStatusContext.Provider value={contextValue}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
