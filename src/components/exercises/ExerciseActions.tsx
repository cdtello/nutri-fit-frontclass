import { deleteExercise } from "@/modules/exercises";
import React, { useState } from "react";

interface ExerciseActionsProps {
  id: number;
  onDeleted: (id: number) => void;
}

export default function ExerciseActions({ id, onDeleted }: ExerciseActionsProps) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (window.confirm("¿Seguro que quieres eliminar este ejercicio?")) {
      setLoading(true);
      try {
        await deleteExercise(id); // Tu función ya implementada
        onDeleted(id); // Notifica al padre para actualizar la lista
        alert("Ejercicio eliminado");
      } catch (e) {
        alert("Error al eliminar");
      }
      setLoading(false);
    }
  };
  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
