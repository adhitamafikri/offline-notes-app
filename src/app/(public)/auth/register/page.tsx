"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/app/actions/auth";
import { AppIDB } from "@/lib/idb";

export default function Register(): React.ReactNode {
  const [idbInstance, setIdbInstance] = useState<AppIDB | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!idbInstance) {
      setIdbInstance(new AppIDB());
    }
  }, [idbInstance]);

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

    const payload = {
      ...formData,
      userId: `usr-${uuidv4()}`,
    };

    // store into the IDB
    if (idbInstance) {
      idbInstance.addData("users", payload);
    }

    // send to backend API
    register(payload);
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
