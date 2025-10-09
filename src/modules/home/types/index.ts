// Tipos específicos del módulo Home
export interface HomeStats {
  totalUsers: number;
  totalRoutines: number;
  totalExercises: number;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}
