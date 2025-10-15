import React, { useState } from "react";
import { createRoutine } from "@/modules/routines/services/routinesService";
import type { CreateRoutineDto, Exercise } from "@/types/api";
import { DayOfWeek } from "@/types/api";

const DAYS: { label: string; value: DayOfWeek }[] = [
  { label: "Lunes", value: DayOfWeek.MONDAY },
  { label: "Martes", value: DayOfWeek.TUESDAY },
  { label: "Miércoles", value: DayOfWeek.WEDNESDAY },
  { label: "Jueves", value: DayOfWeek.THURSDAY },
  { label: "Viernes", value: DayOfWeek.FRIDAY },
  { label: "Sábado", value: DayOfWeek.SATURDAY },
  { label: "Domingo", value: DayOfWeek.SUNDAY },
];

// TODO: Reemplaza esto cuando tengas ejercicios reales desde tu backend
const DUMMY_EXERCISES: Exercise[] = [
  { id: 1, name: "Sentadilla", reps: "10", videoUrl: "", createdAt: "", updatedAt: "" },
  { id: 2, name: "Press banca", reps: "8", videoUrl: "", createdAt: "", updatedAt: "" },
];

export default function RoutineForm({ userId }: { userId: number }) {
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | "">("");
  const [notes, setNotes] = useState("");
  const [exerciseIds, setExerciseIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!dayOfWeek || exerciseIds.length === 0) {
      setError("Selecciona un día y al menos un ejercicio.");
      return;
    }
    setLoading(true);
    try {
      const data: CreateRoutineDto = {
        dayOfWeek: dayOfWeek as DayOfWeek,
        notes: notes ? notes : undefined,
        userId,
        exerciseIds
      };
      await createRoutine(data);
      alert("Rutina creada exitosamente.");
      // Si quieres redirigir automáticamente, descomenta lo siguiente:
      // router.push("/routines");
    } catch (err) {
      setError("Error al crear rutina");
    }
    setLoading(false);
  };

  const handleExerciseToggle = (exerciseId: number) => {
    setExerciseIds(exerciseIds.includes(exerciseId)
      ? exerciseIds.filter(id => id !== exerciseId)
      : [...exerciseIds, exerciseId]);
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Crear Rutina</h2>
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <label className="block mb-2">
        Día de la semana:
        <select
          className="w-full border mt-1 p-2"
          value={dayOfWeek}
          onChange={e => setDayOfWeek(e.target.value as DayOfWeek | "")}
        >
          <option value="">Selecciona un día</option>
          {DAYS.map(day => (
            <option key={day.value} value={day.value}>{day.label}</option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        Notas (opcional):
        <input
          type="text"
          className="w-full border mt-1 p-2"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </label>
      <div className="mb-2">
        <span className="block mb-1">Ejercicios:</span>
        {DUMMY_EXERCISES.map(ex => (
          <label key={ex.id} className="block">
            <input
              type="checkbox"
              value={ex.id}
              checked={exerciseIds.includes(ex.id)}
              onChange={() => handleExerciseToggle(ex.id)}
            />
            {ex.name}
          </label>
        ))}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creando..." : "Crear rutina"}
      </button>
    </form>
  );
}
