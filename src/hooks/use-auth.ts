"use client";

import { useContext } from "react";
import { AuthContext, type IAuthContext } from "@/contexts/auth.context";

export function useAuth(): { auth: IAuthContext } {
  const auth = useContext<IAuthContext | undefined>(AuthContext);
  if (auth === undefined) {
    throw new Error("AuthContext should be used inside the <Authprovider />");
  }

  return {
    auth,
  };
}
