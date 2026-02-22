export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    await new Promise((res) => setTimeout(res, 500)); // simula delay

    if (email === "leonel@cesar.com" && password === "123456") {
      document.cookie = `lc_token=mock_jwt_token; path=/; max-age=${60 * 60 * 24}`; // 1 dia
      return { token: "mock_jwt_token" };
    }

    throw new Error("Credenciais inválidas");
  },

  logout: () => {
    document.cookie = "lc_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },

  getToken: () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("lc_token="))
      ?.split("=")[1];
  },

  // ✅ Nova função register
  register: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    await new Promise((res) => setTimeout(res, 500)); // simula delay

    // Aqui podes usar array local para simular DB
    const usersKey = "lc_users_mock";
    const users: { name: string; email: string; password: string }[] =
      JSON.parse(localStorage.getItem(usersKey) || "[]");

    if (users.find((u) => u.email === email)) {
      throw new Error("Email já registado");
    }

    users.push({ name, email, password });
    localStorage.setItem(usersKey, JSON.stringify(users));

    return { success: true };
  },
};
