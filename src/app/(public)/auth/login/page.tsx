"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/actions/auth";
import { useIDB } from "@/hooks/useIDB";

export default function Login(): React.ReactNode {
  const { idbInstance } = useIDB();
  const [formData, setFormData] = useState({
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

      // store into the IDB
      if (idbInstance) {
        const result = await idbInstance.getDataByKeyPath(
          "users",
          formData.email
        );
        console.log("IDB Result:", result);
      }

      // send to backend API
      login(formData);

      toast.success("Login Success");
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
