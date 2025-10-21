"use client";

import { useState, useEffect } from "react";
import { completeRoutine, getRoutineById } from "@/modules/routines/services/routinesService";
import { ApiError } from "@/modules/routines/services/routinesService";
import type { WeeklyRoutine } from "@/types/api";

export default function RoutineCompletion({ routineId }: { routineId: number }) {
  const [routine, setRoutine] = useState<WeeklyRoutine | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRoutine();
  }, [routineId]);

  const loadRoutine = async () => {
    try {
      const routineData = await getRoutineById(routineId);
      setRoutine(routineData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al cargar la rutina');
      }
    }
  };

  const handleComplete = async () => {
    if (!routine) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedRoutine = await completeRoutine(routineId, !routine.completed);
      setRoutine(updatedRoutine);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al actualizar la rutina');
      }
    } finally {
      setLoading(false);
    }
  };

  if (error && !routine) {
    return (
      <div className="p-6 border rounded-xl bg-red-50 text-red-800 text-center">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="p-6 border rounded-xl bg-gray-50 text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4">Cargando rutina...</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-xl bg-white text-center shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Estado de Rutina</h2>
      
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-900">
          Rutina del {routine.dayOfWeek}
        </p>
        {routine.notes && (
          <p className="text-sm text-gray-600 mt-1">{routine.notes}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {routine.exercises?.length || 0} ejercicio{(routine.exercises?.length || 0) !== 1 ? 's' : ''}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleComplete}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          routine.completed
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Actualizando...
          </div>
        ) : routine.completed ? (
          '✅ Rutina Completada'
        ) : (
          'Marcar como Completada'
        )}
      </button>
    </div>
  );
}
