// src/app/exercises/[id]/delete/page.tsx
"use client"; // Necesario en Next.js 13+ para usar hooks como useState

import { useParams, useRouter } from "next/navigation"; // Para obtener el id de la URL y navegar
import { useState } from "react"; // Para manejar estados (loading, error)
import { deleteExercise } from "@/modules/exercises/services/exercisesService"; // Tu función ya implementada

export default function ExerciseDeletePage() {
  // useParams obtiene los parámetros dinámicos de la URL (en este caso, el id)
  const params = useParams();
  const id = Number(params.id); // Convertimos el id a número

  // useRouter permite navegar a otras páginas
  const router = useRouter();

  // Estados para controlar la UI
  const [loading, setLoading] = useState(false); // Si está eliminando o no
  const [error, setError] = useState<string | null>(null); // Mensaje de error

  // Función que se ejecuta al confirmar eliminación
  const handleDelete = async () => {
    setLoading(true); // Activamos el loading
    setError(null); // Limpiamos errores previos

    try {
      await deleteExercise(id); // Llamamos a tu función
      alert("Ejercicio eliminado exitosamente"); // Mensaje de éxito
      router.push("/exercises"); // Redirigimos a la lista
    } catch (e) {
      // Si hay error, lo mostramos
      setError("Error al eliminar el ejercicio. Intenta de nuevo.");
      console.error("Error:", e);
    } finally {
      setLoading(false); // Desactivamos el loading
    }
  };

  // Función para cancelar
  const handleCancel = () => {
    router.push("/exercises"); // Solo redirigimos, sin eliminar
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Eliminar Ejercicio</h1>

      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
        <p className="text-lg">
          ¿Estás seguro que quieres eliminar el ejercicio con ID:{" "}
          <strong>{id}</strong>?
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Esta acción no se puede deshacer.
        </p>
      </div>

      {/* Mostrar error si existe */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4 text-red-700">
          {error}
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "Eliminando..." : "Sí, eliminar"}
        </button>

        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
