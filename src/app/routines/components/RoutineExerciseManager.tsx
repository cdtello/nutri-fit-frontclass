"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Exercise {
  id: number;
  name: string;
}

export default function RoutineExerciseManager({ routineId }: { routineId: number }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const fetchExercises = async () => {
    try {
      const res = await api.get(`/routines/${routineId}`);
      setExercises(res.data.exercises || []);
    } catch (error) {
      console.error(error);
    }
  };

  const removeExercise = async (exerciseId: number) => {
    try {
      await api.delete(`/routines/${routineId}/exercises/${exerciseId}`);
      fetchExercises();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el ejercicio");
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="p-6 border rounded-xl bg-gray-800 text-white">
      <h2 className="text-xl font-semibold mb-4">Ejercicios de la rutina</h2>
      <ul>
        {exercises.length > 0 ? (
          exercises.map((ex) => (
            <li key={ex.id} className="flex justify-between items-center mb-2">
              <span>{ex.name}</span>
              <button
                onClick={() => removeExercise(ex.id)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay ejercicios en esta rutina.</p>
        )}
      </ul>
    </div>
  );
}
