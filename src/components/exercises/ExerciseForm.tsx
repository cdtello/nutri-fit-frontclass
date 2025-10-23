import type { Exercise } from '@/types/api'; // 👈 1. Importa el tipo

// 2. Define la interfaz para las props
interface ExerciseFormProps {
  onExerciseSaved: (exercise: Exercise) => void;
  onCancel: () => void;
}

// 3. Usa la interfaz en la firma del componente
export default function ExerciseForm({ onExerciseSaved, onCancel }: ExerciseFormProps) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <p className="text-sm text-gray-600">
        💡 <strong>ExerciseForm</strong> - Componente pendiente de implementar
      </p>
      {/* Aquí deberás implementar la lógica del formulario 
        y llamar a onExerciseSaved() o onCancel() cuando sea necesario.
      */}
    </div>
  );
}