"use client";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 redireciona se já estiver logado
  useEffect(() => {
    if (authService.getToken()) {
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login({ email, password });
      router.replace("/Dashboard");
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
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
        Login
      </h2>

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

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-sky-500 hover:bg-sky-600 border-sky-500 text-white"
      >
        {loading ? "A autenticar..." : "Entrar"}
      </Button>
    </form>
  );
};
