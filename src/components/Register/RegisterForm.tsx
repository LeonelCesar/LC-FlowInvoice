"use client";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useAuth } from "../../hooks/userAuth";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded mt-20"
    >
      <h2 className="text-xl font-bold mb-4 text-center text-gray-500">Registo</h2>
      <Input label="Nome" type="text" value={name} onChange={e => setName(e.target.value)} />
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button type="submit" className="w-full mt-4">Registar</Button>
    </form>
  );
};
