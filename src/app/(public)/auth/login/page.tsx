"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/actions/auth";
import { useIDB } from "@/hooks/useIDB";
import { User } from "@/types/user";

interface IFormData {
  email: string;
  password: string;
}

export default function Login(): React.ReactNode {
  const router = useRouter();
  const { idbInstance } = useIDB();
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // check into the IDB
      if (idbInstance) {
        const result = await idbInstance.getDataByKeyPath<User>(
          "users",
          formData.email
        );
        console.log("IDB Result:", result);

        if (result) {
          if (result.password === formData.password) {
            // send to backend API
            login(formData);
            toast.success("Login Success");
            return router.push("/");
          }
          return toast.error("Login Failed");
        }
        return toast.error("Login Failed");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("Login Failed");
    }
  };

  return (
    <div
      id="login-page"
      className="flex flex-col items-center justify-center gap-4"
    >
      <h1>Login to PWA Notes</h1>
      <form
        name="login-form"
        className="w-1/2 flex flex-col items-center justify-center gap-4"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Input
          placeholder="Your Email"
          name="email"
          defaultValue={formData.email}
          onChange={onFieldChange}
          required
        />
        <Input
          placeholder="Your password"
          type="password"
          name="password"
          defaultValue={formData.password}
          onChange={onFieldChange}
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
