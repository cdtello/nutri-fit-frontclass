// Tipos específicos del módulo Profiles
import type { Profile, UpdateProfileDto } from '@/types/api';

export interface ProfileWithStats extends Profile {
  calorieNeeds: number;
  bmi: number;
  bmiCategory: string;
  goalDescription: string;
  activityDescription: string;
}

export interface ProfileFormData extends UpdateProfileDto {
  // Campos adicionales para el formulario si es necesario
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  calorieNeeds: number;
  idealWeight: {
    min: number;
    max: number;
  };
}

export type { Profile, UpdateProfileDto };
