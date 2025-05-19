"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { RegisterRequest, LoginRequest } from "@/models/dto/Auth";

export type RegisterAction = (body: RegisterRequest) => Promise<void>;
export type LoginAction = (body: LoginRequest) => Promise<void>;

export async function register(body: RegisterRequest) {
  console.log("register", body);
}

export async function login(body: LoginRequest) {
  console.log("login", body);
  const cookieStore = await cookies();
  cookieStore.set("access_token", `actok-${uuidv4()}`);
}
