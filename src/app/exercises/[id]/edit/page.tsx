"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getExerciseById, updateExercise } from "@/modules/exercises";

export default function ExerciseEditPage() {
  const router = useRouter();
  const { id } = useParams(); // id de la URL (string)
  const [loading, setLoading] = useState(true);

  // estado del formulario
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");

  // 1) Cargar el ejercicio actual desde el backend
  useEffect(() => {
    async function load() {
      try {
        const ex = await getExerciseById(Number(id));
        setName(ex.name || "");
        setReps(ex.reps || "");
      } catch (e) {
        alert("No se pudo cargar el ejercicio");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // 2) Guardar cambios REAL a Nest (PATCH /exercises/:id)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateExercise(Number(id), { name, reps });
      alert("✅ Cambios guardados correctamente");
      // Opcional: volver al detalle
      router.push(`/exercises/${id}`);
    } catch (e) {
      console.error(e);
      alert("❌ Hubo un error al guardar");
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <main className="min-h-screen max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Ejercicio</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded p-6">
        <div>
          <label className="block font-medium mb-1">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Repeticiones</label>
          <input
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Guardar cambios
        </button>
      </form>
    </main>
  );
}