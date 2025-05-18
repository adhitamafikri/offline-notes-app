"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/app/actions/auth";
import { usePouchDB } from "@/hooks/use-pouchdb";
import { User } from "@/models/User";

type IFormData = Omit<User, "userId">;

export default function Register(): React.ReactNode {
  const router = useRouter();
  const { pouchDB } = usePouchDB();
  const [formData, setFormData] = useState<IFormData>({
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
    try {
      e.preventDefault();

      const id = `usr-${uuidv4()}`;
      const payload: User & { _id: string } = {
        ...formData,
        userId: id,
        _id: id,
      };

      // store into the IDB
      await pouchDB.addData<IFormData, User>(payload, "user");
      // send to backend API
      register(payload);

      toast.success("Registration Success");
      return router.push("/auth/login");
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error("Registration Failed");
    }
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
