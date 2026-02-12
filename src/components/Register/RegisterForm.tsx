"use client";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await authService.register({ name, email, password });

      console.log("Registo efetuado com sucesso");

      
      router.push("/Login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-20"
    >
      <h2 className="text-xl font-bold mb-4 text-center text-gray-500">
        Registo
      </h2>

      <Input
        label="Nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading ? "A registar..." : "Registar"}
      </Button>
    </form>
  );
};
