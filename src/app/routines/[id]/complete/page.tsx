import RoutineCompletion from "../../../routines/components/RoutineCompletion";



export default async function CompleteRoutinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-900 p-10">
      <h1 className="text-2xl text-white mb-6">Completar rutina #{id}</h1>
      <RoutineCompletion routineId={Number(id)} />
    </main>
  );
}
