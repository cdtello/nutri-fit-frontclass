// Users Service - API calls y lógica de negocio
import type { User, UpdateUserDto } from '../types';
import type { WeeklyRoutine } from '@/types/api';

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

// actualizar usuario
export async function updateUser(id: number, updateData: UpdateUserDto): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Error al actualizar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en updateUser:', error);
    throw error;
  }
}

// eliminar usuario
export async function deleteUser(id: number): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Error al eliminar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en deleteUser:', error);
    throw error;
  }
}

// obtener rutinas del usuario
export async function getUserRoutines(id: number): Promise<WeeklyRoutine[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}/routines`);

    if (!response.ok) {
      throw new ApiError(response.status, 'Error al obtener rutinas del usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getUserRoutines:', error);
    throw error;
  }
}

// 🔄 Funciones para implementar por los estudiantes:

// export async function getUserById(id: number): Promise<User>
// export async function createUser(data: CreateUserDto): Promise<User>
// export async function getUserRoutines(id: number): Promise<WeeklyRoutine[]>
// export function filterUsers(users: User[], filters: UserFilters): User[]
// export function transformUserForDisplay(user: User): UserWithStats