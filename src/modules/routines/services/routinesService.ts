import type { CreateRoutineDto, WeeklyRoutine } from "@/types/api";

export async function createRoutine(data: CreateRoutineDto): Promise<WeeklyRoutine> {
  const response = await fetch('/api/routines', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al crear rutina");
  return response.json();
}