// Routines Service - API calls y lógica de negocio
// Los tipos se importarán cuando se implementen las funciones

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 🔄 Funciones para implementar por los estudiantes:
// Nota: Importar los tipos necesarios cuando implementes cada función

// export async function getAllRoutines(filters?: { dayOfWeek?: string; completed?: boolean; userId?: number }): Promise<WeeklyRoutine[]>
// export async function getRoutineById(id: number): Promise<WeeklyRoutine>
// export async function createRoutine(data: CreateRoutineDto): Promise<WeeklyRoutine>
// export async function updateRoutine(id: number, data: UpdateRoutineDto): Promise<WeeklyRoutine>
// export async function deleteRoutine(id: number): Promise<void>
// export async function completeRoutine(id: number, completed: boolean): Promise<WeeklyRoutine>
// export async function addExerciseToRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine>
// export async function removeExerciseFromRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine>
// export function getRoutinesByDay(routines: WeeklyRoutine[], dayOfWeek: string): WeeklyRoutine[]
// export function getCompletedRoutines(routines: WeeklyRoutine[]): WeeklyRoutine[]
// export function getPendingRoutines(routines: WeeklyRoutine[]): WeeklyRoutine[]
// export function calculateRoutineProgress(routines: WeeklyRoutine[]): { completed: number; total: number; percentage: number }
