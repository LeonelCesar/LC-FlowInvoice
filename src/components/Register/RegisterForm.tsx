"use client";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { FormEvent, useState } from "react";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const handleRegister = async () => {
  setLoading(true);
  setError(null);

  try {
    await authService.register({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    console.log("Registo efetuado com sucesso");

    router.replace("/login");
  } catch (error: unknown) {
    console.error("Erro no registo:", error);

    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Erro inesperado ao tentar registar.");
    }
  } finally {
    setLoading(false);
  }
};


  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleRegister();
  }


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

      <Button type="submit" disabled={loading} className="w-full mt-4 bg-sky-500 hover:bg-sky-600 border-sky-500 text-white">
        {loading ? "A registar..." : "Registar"}
      </Button>
    </form>
  );
};
