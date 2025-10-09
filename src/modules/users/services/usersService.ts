// Users Service - API calls y lógica de negocio
import type { User } from '../types';

// Usar el proxy configurado en next.config.ts
const API_BASE_URL = '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// ✅ Función implementada como guía
export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new ApiError(response.status, 'Error al obtener usuarios');
    }
    return response.json();
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    throw error;
  }
}

// 🔄 Funciones para implementar por los estudiantes:

// export async function getUserById(id: number): Promise<User>
// export async function createUser(data: CreateUserDto): Promise<User>
// export async function updateUser(id: number, data: UpdateUserDto): Promise<User>
// export async function deleteUser(id: number): Promise<void>
// export async function getUserRoutines(id: number): Promise<WeeklyRoutine[]>
// export function filterUsers(users: User[], filters: UserFilters): User[]
// export function transformUserForDisplay(user: User): UserWithStats
