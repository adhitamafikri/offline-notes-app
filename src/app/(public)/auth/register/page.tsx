"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/app/actions/auth";
import { useAuth } from "@/hooks/use-auth";
import type { IRegisterFormData } from "@/contexts/auth.context";

export default function Register(): React.ReactNode {
  const { auth } = useAuth();
  const [formData, setFormData] = useState<IRegisterFormData>({
    email: "",
    name: "",
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
    e.preventDefault();
    auth.register(formData, register);
  };

  return (
    <div
      id="register-page"
      className="flex flex-col items-center justify-center gap-4"
    >
      <h1>Register to PWA Notes</h1>
      <form
        name="register-form"
        className="w-1/2 flex flex-col items-center justify-center gap-4"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Input
          placeholder="Your Email"
          name="email"
          type="email"
          defaultValue={formData.email}
          onChange={onFieldChange}
          required
        />
        <Input
          placeholder="Your Name"
          name="name"
          defaultValue={formData.name}
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
          Register
        </Button>
      </form>
    </div>
  );
}
