import { Profile, UpdateProfileDto, Goal, ActivityLevel } from '../../../types/api';

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

// ✅ Obtener perfil por ID de usuario
export async function getProfileByUserId(userId: number): Promise<Profile> {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${userId}`);
    return handleResponse<Profile>(response);
  } catch (error) {
    console.error('Error en getProfileByUserId:', error);
    throw error;
  }
}

// ✅ Actualizar perfil
export async function updateProfile(userId: number, data: UpdateProfileDto): Promise<Profile> {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Profile>(response);
  } catch (error) {
    console.error('Error en updateProfile:', error);
    throw error;
  }
}

// ✅ Obtener descripción del objetivo
export function getGoalDescription(goal: string): string {
  const descriptions: Record<string, string> = {
    [Goal.LOSE_WEIGHT]: 'Perder peso',
    [Goal.GAIN_MUSCLE]: 'Ganar músculo',
    [Goal.MAINTAIN]: 'Mantener peso',
  };
  return descriptions[goal] || goal;
}

// ✅ Obtener descripción del nivel de actividad
export function getActivityLevelDescription(activityLevel: string): string {
  const descriptions: Record<string, string> = {
    [ActivityLevel.SEDENTARY]: 'Sedentario (poco o ningún ejercicio)',
    [ActivityLevel.LIGHT]: 'Ligero (ejercicio 1-3 días/semana)',
    [ActivityLevel.MODERATE]: 'Moderado (ejercicio 3-5 días/semana)',
    [ActivityLevel.ACTIVE]: 'Activo (ejercicio 6-7 días/semana)',
    [ActivityLevel.VERY_ACTIVE]: 'Muy activo (ejercicio intenso diario)',
  };
  return descriptions[activityLevel] || activityLevel;
}

// ✅ Calcular necesidades calóricas
export function calculateCalorieNeeds(
  weight: number,
  height: number,
  age: number,
  activityLevel: string,
  goal: string
): number {
  // Fórmula de Harris-Benedict (BMR)
  // Para simplificar, asumimos género masculino
  const bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  
  // Multiplicadores de actividad
  const activityMultipliers: Record<string, number> = {
    [ActivityLevel.SEDENTARY]: 1.2,
    [ActivityLevel.LIGHT]: 1.375,
    [ActivityLevel.MODERATE]: 1.55,
    [ActivityLevel.ACTIVE]: 1.725,
    [ActivityLevel.VERY_ACTIVE]: 1.9,
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1.2;
  let calories = bmr * multiplier;
  
  // Ajuste según objetivo
  if (goal === Goal.LOSE_WEIGHT) {
    calories -= 500; // Déficit calórico para perder peso
  } else if (goal === Goal.GAIN_MUSCLE) {
    calories += 500; // Superávit calórico para ganar músculo
  }
  
  return Math.round(calories);
}

// ✅ Calcular IMC (Índice de Masa Corporal)
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

// ✅ Obtener categoría de IMC
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Bajo peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidad';
}