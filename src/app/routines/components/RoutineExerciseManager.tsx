"use client";

import { useEffect, useState } from "react";
import { removeExerciseFromRoutine, getRoutineById } from "@/modules/routines/services/routinesService";
import { ApiError } from "@/modules/routines/services/routinesService";
import type { WeeklyRoutine, Exercise } from "@/types/api";

export default function RoutineExerciseManager({ routineId }: { routineId: number }) {
  const [routine, setRoutine] = useState<WeeklyRoutine | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingRoutine, setIsLoadingRoutine] = useState(true);

  const fetchRoutine = async () => {
    try {
      setIsLoadingRoutine(true);
      setError(null);
      const routineData = await getRoutineById(routineId);
      setRoutine(routineData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al cargar la rutina');
      }
    } finally {
      setIsLoadingRoutine(false);
    }
  };

  const removeExercise = async (exerciseId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este ejercicio de la rutina?')) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await removeExerciseFromRoutine(routineId, exerciseId);
      await fetchRoutine(); // Recargar la rutina
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al eliminar el ejercicio');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutine();
  }, [routineId]);

  if (isLoadingRoutine) {
    return (
      <div className="p-6 border rounded-xl bg-gray-50 text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4">Cargando ejercicios de la rutina...</p>
      </div>
    );
  }

  if (error && !routine) {
    return (
      <div className="p-6 border rounded-xl bg-red-50 text-red-800 text-center">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p>{error}</p>
        <button
          onClick={fetchRoutine}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-xl bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Ejercicios de la Rutina</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {routine && routine.exercises && routine.exercises.length > 0 ? (
        <div className="space-y-3">
          {routine.exercises.map((exercise: Exercise) => (
            <div
              key={exercise.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                <p className="text-sm text-gray-600">{exercise.reps}</p>
                {exercise.videoUrl && (
                  <a
                    href={exercise.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Ver video
                  </a>
                )}
              </div>
              <button
                onClick={() => removeExercise(exercise.id)}
                disabled={loading}
                className="ml-4 bg-red-600 px-3 py-1 rounded text-white text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No hay ejercicios en esta rutina.</p>
          <p className="text-sm mt-2">Usa el selector de arriba para agregar ejercicios.</p>
        </div>
      )}
    </div>
  );
}
