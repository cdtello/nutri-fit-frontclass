// src/components/exercises/ExerciseList.tsx
import Link from "next/link";

export type Exercise = {
  id: number;
  name: string;
  reps?: string;
  videoUrl?: string;
};

type Props = {
  exercises: Exercise[];
};

export default function ExerciseList({ exercises }: Props) {
  if (!exercises?.length) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-600">No hay ejercicios todavía.</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exercises.map((ex) => (
        <li key={ex.id} className="p-4 rounded-lg shadow bg-white">
          <h3 className="font-semibold text-lg">{ex.name}</h3>
          {ex.reps && <p className="text-sm text-gray-600 mt-1">{ex.reps}</p>}

          <div className="mt-3 flex gap-4">
            <Link href={`/exercises/${ex.id}`} className="text-blue-600 hover:underline">
              Ver detalle
            </Link>
            <Link href={`/exercises/${ex.id}/edit`} className="text-amber-600 hover:underline">
              Editar
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}