// services/auth.service.ts

import { LoginDTO, RegisterDTO, User } from "@/types/auth"
import { mockUser } from "@/mocks/auth.mock"

/**
 * Simula delay de rede
 */
const simulateDelay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * Contrato do serviço de autenticação
 */
export interface AuthService {
  login(data: LoginDTO): Promise<User>
  logout(): Promise<void>
  register(data: RegisterDTO): Promise<User>;
}

/**
 * Implementação mock (substituível por API real)
 */
class MockAuthService implements AuthService {
  async login(data: LoginDTO): Promise<User> {
    await simulateDelay(800)

    const isValidUser =
      data.email === "leonel@cesar.com" &&
      data.password === "123456"

    if (!isValidUser) {
      throw new Error("Credenciais inválidas")
    }

    return mockUser
  }

  async register(data: RegisterDTO): Promise<User> {
    await simulateDelay(1000)

    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos os campos são obrigatórios")
    }

    // Simula criação de utilizador
    return {
      ...mockUser,
      name: data.name,
      email: data.email,
    }
  }

  async logout(): Promise<void> {
    await simulateDelay(300)
  }
}

/**
 * Exporta instância concreta
 * Facilmente substituível por ApiAuthService no futuro
 */
export const authService: AuthService = new MockAuthService()
