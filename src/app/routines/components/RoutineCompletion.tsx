"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function RoutineCompletion({ routineId }: { routineId: number }) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      await api.patch(`/routines/${routineId}/complete`, { completed: !completed });
      setCompleted(!completed);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la rutina");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-xl bg-gray-800 text-white text-center">
      <h2 className="text-xl font-semibold mb-4">Estado de rutina</h2>
      <button
        onClick={handleComplete}
        disabled={loading}
        className={`px-4 py-2 rounded-lg ${
          completed ? "bg-green-600" : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        {loading ? "Actualizando..." : completed ? "Rutina completada ✅" : "Marcar como completada"}
      </button>
    </div>
  );
}
