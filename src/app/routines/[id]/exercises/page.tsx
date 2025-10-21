import ExerciseSelector from "../../../routines/components/ExerciseSelector";
import RoutineExerciseManager from "../../../routines/components/RoutineExerciseManager";


export default async function RoutineExercisesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-900 p-10 space-y-6">
      <h1 className="text-2xl text-white mb-6">
        Ejercicios de la rutina #{id}
      </h1>
      <ExerciseSelector routineId={Number(id)} />
      <RoutineExerciseManager routineId={Number(id)} />
    </main>
  );
}
