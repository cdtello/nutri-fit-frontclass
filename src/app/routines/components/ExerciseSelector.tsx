"use client";

import { useState, useEffect } from "react";
import { addExerciseToRoutine } from "@/modules/routines/services/routinesService";
import { getAllExercises } from "@/modules/exercises/services/exercisesService";
import { ApiError } from "@/modules/routines/services/routinesService";
import type { Exercise } from "@/types/api";

export default function ExerciseSelector({ routineId }: { routineId: number }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingExercises, setIsLoadingExercises] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setIsLoadingExercises(true);
      const exercisesData = await getAllExercises();
      setExercises(exercisesData);
    } catch (err) {
      setMessage("❌ Error al cargar los ejercicios");
    } finally {
      setIsLoadingExercises(false);
    }
  };

  const handleAdd = async () => {
    if (!selectedExerciseId) {
      setMessage("❌ Debes seleccionar un ejercicio");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      await addExerciseToRoutine(routineId, selectedExerciseId);
      setMessage("✅ Ejercicio agregado correctamente");
      setSelectedExerciseId(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setMessage(`❌ ${err.message}`);
      } else {
        setMessage("❌ Error al agregar el ejercicio");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingExercises) {
    return (
      <div className="p-6 border rounded-xl bg-gray-50 text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4">Cargando ejercicios...</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-xl bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Agregar Ejercicio</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="exerciseSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Ejercicio
          </label>
          <select
            id="exerciseSelect"
            value={selectedExerciseId || ""}
            onChange={(e) => setSelectedExerciseId(Number(e.target.value) || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un ejercicio</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} - {exercise.reps}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAdd}
          disabled={loading || !selectedExerciseId}
          className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Agregando...
            </>
          ) : (
            'Agregar Ejercicio'
          )}
        </button>

        {message && (
          <div className={`p-3 rounded-md text-sm ${
            message.startsWith('✅') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
