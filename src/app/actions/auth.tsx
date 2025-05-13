"use server";

import { RegisterRequest, LoginRequest } from "@/types/dto/auth";

export async function register(body: RegisterRequest) {
  console.log("register", body);
}

export async function login(body: LoginRequest) {
  console.log("login", body);
}
