// Exercises Service - API calls y lógica de negocio
// Los tipos se importarán cuando se implementen las funciones

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 🔄 Funciones para implementar por los estudiantes:
// Nota: Importar los tipos necesarios cuando implementes cada función

// export async function getAllExercises(): Promise<Exercise[]>
// export async function getExerciseById(id: number): Promise<Exercise>
// export async function createExercise(data: CreateExerciseDto): Promise<Exercise>
// export async function updateExercise(id: number, data: UpdateExerciseDto): Promise<Exercise>
// export async function deleteExercise(id: number): Promise<void>
// export function filterExercises(exercises: Exercise[], searchTerm: string): Exercise[]
// export function groupExercisesByCategory(exercises: Exercise[]): Record<string, Exercise[]>
