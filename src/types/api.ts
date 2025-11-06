// Types from Backend API
export enum Goal {
  LOSE_WEIGHT = 'LOSE_WEIGHT',
  GAIN_MUSCLE = 'GAIN_MUSCLE',
  MAINTAIN = 'MAINTAIN',
}

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHT = 'LIGHT',
  MODERATE = 'MODERATE',
  ACTIVE = 'ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE',
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
  weeklyRoutines?: WeeklyRoutine[];
}

export interface Profile {
  id: number;
  goal: Goal;
  activityLevel: ActivityLevel;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Exercise {
  id: number;
  name: string;
  reps: string;
  videoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  weeklyRoutines?: WeeklyRoutine[];
}

export interface WeeklyRoutine {
  id: number;
  dayOfWeek: DayOfWeek;
  completed: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  exercises?: Exercise[];
}

// DTOs for API requests
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  weight?: number;
  height?: number;
}

export interface UpdateProfileDto {
  goal?: Goal;
  activityLevel?: ActivityLevel;
}

export interface CreateExerciseDto {
  name: string;
  reps: string;
  videoUrl?: string;
}

export interface UpdateExerciseDto {
  name?: string;
  reps?: string;
  videoUrl?: string;
}

export interface CreateRoutineDto {
  dayOfWeek: DayOfWeek;
  notes?: string;
  userId: number;
  exerciseIds: number[];
}

export interface UpdateRoutineDto {
  dayOfWeek?: DayOfWeek;
  notes?: string;
  exerciseIds?: number[];
}

export interface CompleteRoutineDto {
  completed: boolean;
}

export interface AddExerciseToRoutineDto {
  exerciseId: number;
}
