import Link from "next/link";
import { notFound } from "next/navigation";
import { Exercise } from "@/types/api";

async function getExercise(id: string): Promise<Exercise> {
  try {
    console.log(`Fetching exercise with ID: ${id}`);
    const res = await fetch(`http://34.229.144.19:3000/exercises/${id}`, {
      // evita caché mientras desarrollas
      cache: "no-store",
    });

    console.log(`Response status: ${res.status}`);
    console.log(`Response ok: ${res.ok}`);

    if (!res.ok) {
      if (res.status === 404) {
        console.log("Exercise not found, calling notFound()");
        notFound();
      }
      const errorText = await res.text();
      console.error(`Error response body: ${errorText}`);
      throw new Error(`Error ${res.status}: No se pudo cargar el ejercicio`);
    }

    const data = await res.json();
    console.log("Exercise data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching exercise:", error);
    throw new Error("Error de conexión con el servidor");
  }
}

interface ExerciseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExerciseDetailPage({
  params,
}: ExerciseDetailPageProps) {
  try {
    const { id } = await params;
    console.log(`Component received params with id: ${id}`);
    
    const exercise = await getExercise(id);

    return (
      <main className="max-w-3xl mx-auto p-6">
        <Link href="/exercises" className="text-blue-600 hover:underline">
          ← Volver al listado
        </Link>

        <h1 className="text-3xl font-bold mt-4">{exercise.name}</h1>

        <p className="mt-4">
          <strong>Repeticiones:</strong> {exercise.reps}
        </p>

        {exercise.videoUrl && exercise.videoUrl.trim() !== '' && (
          <p className="mt-2">
            <strong>Video:</strong>{" "}
            <a
              href={exercise.videoUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              Ver video
            </a>
          </p>
        )}

        <div className="mt-6">
          <Link
            href={`/exercises/${exercise.id}/edit`}
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
          >
            Editar ejercicio
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error in ExerciseDetailPage component:", error);
    return (
      <main className="max-w-3xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="text-xl font-bold mb-2">Error al cargar el ejercicio</h2>
          <p className="mb-4">
            No se pudo cargar la información del ejercicio. Por favor, verifica que el backend esté ejecutándose.
          </p>
          <Link href="/exercises" className="text-blue-600 hover:underline">
            ← Volver al listado de ejercicios
          </Link>
        </div>
      </main>
    );
  }
}