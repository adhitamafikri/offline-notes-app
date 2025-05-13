"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/app/actions/auth";

export default function Register(): React.ReactNode {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("field changed", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
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
          Register
        </Button>
      </form>
    </div>
  );
}
