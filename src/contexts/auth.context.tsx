"use client";

import { createContext, useCallback, useMemo } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { dbConfig } from "@/utils/pouchdb";
import { usePouchDB } from "@/hooks/use-pouchdb";
import { User, UserProfile } from "@/models/User";

import type { RegisterAction, LoginAction } from "@/app/actions/auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RegisterRequest, LoginRequest } from "@/models/dto/Auth";

export interface IAuthContext {
  register: (
    payload: IRegisterFormData,
    serverAction: RegisterAction
  ) => Promise<void>;
  login: (payload: ILoginFormData, serverAction: LoginAction) => Promise<void>;
  // logout: (serverAction: () => Promise<any>) => Promise<void>
  getUserData: () => UserProfile | undefined;
}

export type IRegisterFormData = Omit<User, "userId">;

export type ILoginFormData = {
  email: string;
  password: string;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const router = useRouter();
  const { pouchDB } = usePouchDB();

  const register = useCallback(
    async (
      payload: IRegisterFormData,
      serverAction: RegisterAction
    ): Promise<void> => {
      try {
        const id = `usr-${nanoid()}`;
        const finalPayload: RegisterRequest = {
          ...payload,
          userId: id,
          _id: id,
        };

        // store into the IDB
        await pouchDB.addData<RegisterRequest, User>("users", finalPayload);
        // send to backend API
        await serverAction(finalPayload);

        toast.success("Registration Success");
        router.push("/auth/login");
        return;
      } catch (error) {
        console.error("Registration Failed:", error);
        toast.error("Registration Failed");
        throw error;
      }
    },
    [router, pouchDB]
  );

  const login = useCallback(
    async (
      payload: ILoginFormData,
      serverAction: LoginAction
    ): Promise<void> => {
      try {
        // check into the IDB
        const userData = await pouchDB.findData<User>("users", {
          selector: { email: payload.email },
          use_index: [
            dbConfig.users.index.findUser.ddoc,
            dbConfig.users.index.findUser.name,
          ],
        });
        console.log("IDB Result:", userData);

        if (userData) {
          if (userData.password === payload.password) {
            // send to backend API
            await serverAction(payload);
            // save to User Profile data to localStorage
            localStorage.setItem("user_profile", JSON.stringify(userData));
            toast.success("Login Success");
            router.push("/");
            return;
          }
          toast.error("Login Failed");
          return;
        }
        toast.error("Login Failed");
      } catch (error) {
        console.error("Login Failed:", error);
        toast.error("Login Failed");
        throw error;
      }
    },
    [router, pouchDB]
  );

  const getUserData = useCallback((): UserProfile | undefined => {
    const lsData = localStorage.getItem("user_profile");
    if (lsData) {
      const data = JSON.parse(lsData);
      return data as UserProfile;
    }

    return undefined;
  }, []);

  const contextValue = useMemo(
    () => ({ register, login, getUserData }),
    [register, login, getUserData]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
