// src/app/exercises/page.tsx
import ExerciseList from '@/components/exercises/ExerciseList';
import { getAllExercises } from '@/modules/exercises';

export default async function ExercisesPage() {
  // Llamada en el servidor (Next.js App Router soporta funciones async en server components)
  const exercises = await getAllExercises();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Catálogo de Ejercicios</h2>
        <ExerciseList exercises={exercises} />
      </div>
    </div>
  );
}
