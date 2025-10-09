// Profiles Service - API calls y lógica de negocio
// Los tipos se importarán cuando se implementen las funciones

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 🔄 Funciones para implementar por los estudiantes:
// Nota: Importar los tipos necesarios cuando implementes cada función

// export async function getProfileByUserId(userId: number): Promise<Profile>
// export async function updateProfile(userId: number, data: UpdateProfileDto): Promise<Profile>
// export function getGoalDescription(goal: string): string
// export function getActivityLevelDescription(activityLevel: string): string
// export function calculateCalorieNeeds(weight: number, height: number, age: number, activityLevel: string, goal: string): number
