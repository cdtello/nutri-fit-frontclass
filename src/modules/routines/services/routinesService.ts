import { 
  WeeklyRoutine, 
  CreateRoutineDto, 
  UpdateRoutineDto, 
  CompleteRoutineDto,
  AddExerciseToRoutineDto 
} from '../../../types/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const API_BASE_URL = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new ApiError(response.status, errorData.message || `Error ${response.status}`);
  }
  return response.json();
}

export async function getAllRoutines(filters?: { 
  dayOfWeek?: string; 
  completed?: boolean; 
  userId?: number 
}): Promise<WeeklyRoutine[]> {
  const queryParams = new URLSearchParams();
  
  if (filters?.dayOfWeek) queryParams.append('dayOfWeek', filters.dayOfWeek);
  if (filters?.completed !== undefined) queryParams.append('completed', filters.completed.toString());
  if (filters?.userId) queryParams.append('userId', filters.userId.toString());
  
  const url = `${API_BASE_URL}/routines${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  return handleResponse<WeeklyRoutine[]>(response);
}

export async function getRoutineById(id: number): Promise<WeeklyRoutine> {
  const response = await fetch(`${API_BASE_URL}/routines/${id}`);
  return handleResponse<WeeklyRoutine>(response);
}

export async function createRoutine(data: CreateRoutineDto): Promise<WeeklyRoutine> {
  const response = await fetch(`${API_BASE_URL}/routines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<WeeklyRoutine>(response);
}

export async function updateRoutine(id: number, data: UpdateRoutineDto): Promise<WeeklyRoutine> {
  const response = await fetch(`${API_BASE_URL}/routines/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<WeeklyRoutine>(response);
}

export async function deleteRoutine(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/routines/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error al eliminar rutina' }));
    throw new ApiError(response.status, errorData.message || `Error ${response.status}`);
  }
}

export async function completeRoutine(id: number, completed: boolean): Promise<WeeklyRoutine> {
  const response = await fetch(`${API_BASE_URL}/routines/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  return handleResponse<WeeklyRoutine>(response);
}

export async function addExerciseToRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine> {
  const response = await fetch(`${API_BASE_URL}/routines/${routineId}/exercises`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ exerciseId }),
  });
  return handleResponse<WeeklyRoutine>(response);
}

export async function removeExerciseFromRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine> {
  const response = await fetch(`${API_BASE_URL}/routines/${routineId}/exercises/${exerciseId}`, {
    method: 'DELETE',
  });
  return handleResponse<WeeklyRoutine>(response);
}

export function getRoutinesByDay(routines: WeeklyRoutine[], dayOfWeek: string): WeeklyRoutine[] {
  return routines.filter(routine => routine.dayOfWeek === dayOfWeek);
}

export function getCompletedRoutines(routines: WeeklyRoutine[]): WeeklyRoutine[] {
  return routines.filter(routine => routine.completed);
}

export function getPendingRoutines(routines: WeeklyRoutine[]): WeeklyRoutine[] {
  return routines.filter(routine => !routine.completed);
}

export function calculateRoutineProgress(routines: WeeklyRoutine[]): { 
  completed: number; 
  total: number; 
  percentage: number 
} {
  const completed = getCompletedRoutines(routines).length;
  const total = routines.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
}
