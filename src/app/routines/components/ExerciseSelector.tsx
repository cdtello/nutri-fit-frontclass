"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ExerciseSelector({ routineId }: { routineId: number }) {
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const handleAdd = async () => {
    if (!exerciseId) return alert("Debes ingresar un ID de ejercicio");
    try {
      await api.post(`/routines/${routineId}/exercises`, { exerciseId });
      setMessage("✅ Ejercicio agregado correctamente");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al agregar el ejercicio");
    }
  };

  return (
    <div className="p-6 border rounded-xl bg-gray-800 text-white">
      <h2 className="text-xl font-semibold mb-4">Agregar ejercicio</h2>
      <input
        type="number"
        placeholder="ID del ejercicio"
        value={exerciseId ?? ""}
        onChange={(e) => setExerciseId(Number(e.target.value))}
        className="p-2 rounded bg-gray-700 text-white w-full mb-2"
      />
      <button onClick={handleAdd} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
        Agregar
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
