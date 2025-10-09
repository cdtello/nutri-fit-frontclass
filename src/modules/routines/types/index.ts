// Tipos específicos del módulo Routines
import type { WeeklyRoutine, CreateRoutineDto, UpdateRoutineDto, CompleteRoutineDto, AddExerciseToRoutineDto } from '@/types/api';

export interface RoutineWithStats extends WeeklyRoutine {
  exerciseCount: number;
  estimatedDuration: number; // en minutos
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
}

export interface RoutineFilters {
  dayOfWeek?: string;
  completed?: boolean;
  userId?: number;
  difficulty?: string;
}

export interface RoutineProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface WeeklySchedule {
  [key: string]: WeeklyRoutine[]; // dayOfWeek -> routines
}

export type { WeeklyRoutine, CreateRoutineDto, UpdateRoutineDto, CompleteRoutineDto, AddExerciseToRoutineDto };
