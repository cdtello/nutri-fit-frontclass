import { Exercise, CreateExerciseDto, UpdateExerciseDto } from '../../../types/api';

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

export async function getAllExercises(): Promise<Exercise[]> {
  const response = await fetch(`${API_BASE_URL}/exercises`);
  return handleResponse<Exercise[]>(response);
}

export async function getExerciseById(id: number): Promise<Exercise> {
  const response = await fetch(`${API_BASE_URL}/exercises/${id}`);
  return handleResponse<Exercise>(response);
}

export async function createExercise(data: CreateExerciseDto): Promise<Exercise> {
  const response = await fetch(`${API_BASE_URL}/exercises`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Exercise>(response);
}

export async function updateExercise(id: number, data: UpdateExerciseDto): Promise<Exercise> {
  const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Exercise>(response);
}

export async function deleteExercise(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error al eliminar ejercicio' }));
    throw new ApiError(response.status, errorData.message || `Error ${response.status}`);
  }
}

export function filterExercises(exercises: Exercise[], searchTerm: string): Exercise[] {
  if (!searchTerm.trim()) return exercises;
  
  const term = searchTerm.toLowerCase();
  return exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(term) ||
    exercise.reps.toLowerCase().includes(term)
  );
}

export function groupExercisesByCategory(exercises: Exercise[]): Record<string, Exercise[]> {
  const categories: Record<string, Exercise[]> = {};
  
  exercises.forEach(exercise => {
    const category = extractCategoryFromName(exercise.name);
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(exercise);
  });
  
  return categories;
}

function extractCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('pecho') || lowerName.includes('press') || lowerName.includes('apertura')) {
    return 'Pecho';
  } else if (lowerName.includes('cuádriceps') || lowerName.includes('sentadilla') || lowerName.includes('prensa')) {
    return 'Cuádriceps';
  } else if (lowerName.includes('hombro') || lowerName.includes('vuelo') || lowerName.includes('press militar')) {
    return 'Hombros';
  } else if (lowerName.includes('bíceps') || lowerName.includes('curl')) {
    return 'Bíceps';
  } else if (lowerName.includes('tríceps') || lowerName.includes('rompe') || lowerName.includes('copa')) {
    return 'Tríceps';
  } else if (lowerName.includes('femoral') || lowerName.includes('peso muerto')) {
    return 'Femoral';
  } else if (lowerName.includes('espalda') || lowerName.includes('remo') || lowerName.includes('dominada')) {
    return 'Espalda';
  } else if (lowerName.includes('abs') || lowerName.includes('crunch') || lowerName.includes('plancha')) {
    return 'Abdominales';
  } else if (lowerName.includes('pantorrilla')) {
    return 'Pantorrillas';
  } else {
    return 'Otros';
  }
}
