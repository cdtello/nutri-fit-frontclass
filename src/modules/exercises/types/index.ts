// Tipos específicos del módulo Exercises
import type { Exercise, CreateExerciseDto, UpdateExerciseDto } from '@/types/api';

export interface ExerciseWithStats extends Exercise {
  totalRoutines: number;
  isInUse: boolean;
}

export interface ExerciseFilters {
  search?: string;
  category?: string;
  inUse?: boolean;
}

export interface ExerciseCategory {
  name: string;
  exercises: Exercise[];
  count: number;
}

export type { Exercise, CreateExerciseDto, UpdateExerciseDto };
