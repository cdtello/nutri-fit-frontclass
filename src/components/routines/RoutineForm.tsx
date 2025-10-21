'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WeeklyRoutine, CreateRoutineDto, DayOfWeek, Exercise } from '../../types/api';
import { createRoutine, updateRoutine } from '../../modules/routines/services/routinesService';
import { getAllExercises } from '../../modules/exercises/services/exercisesService';
import { ApiError } from '../../modules/routines/services/routinesService';

interface RoutineFormProps {
  routine?: WeeklyRoutine;
  userId: number;
  onRoutineSaved?: (routine: WeeklyRoutine) => void;
  onCancel?: () => void;
}

const DAYS_OF_WEEK: { value: DayOfWeek; label: string }[] = [
  { value: DayOfWeek.MONDAY, label: 'Lunes' },
  { value: DayOfWeek.TUESDAY, label: 'Martes' },
  { value: DayOfWeek.WEDNESDAY, label: 'Miércoles' },
  { value: DayOfWeek.THURSDAY, label: 'Jueves' },
  { value: DayOfWeek.FRIDAY, label: 'Viernes' },
  { value: DayOfWeek.SATURDAY, label: 'Sábado' },
  { value: DayOfWeek.SUNDAY, label: 'Domingo' },
];

export default function RoutineForm({ 
  routine, 
  userId, 
  onRoutineSaved, 
  onCancel 
}: RoutineFormProps) {
  const [formData, setFormData] = useState<CreateRoutineDto>({
    dayOfWeek: DayOfWeek.MONDAY,
    notes: '',
    userId,
    exerciseIds: [],
  });
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isEditing = !!routine;

  useEffect(() => {
    loadExercises();
    
    if (routine) {
      setFormData({
        dayOfWeek: routine.dayOfWeek,
        notes: routine.notes || '',
        userId: routine.user?.id || userId,
        exerciseIds: routine.exercises?.map(ex => ex.id) || [],
      });
    }
  }, [routine, userId]);

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const exercisesData = await getAllExercises();
      setExercises(exercisesData);
    } catch (err) {
      setError('Error al cargar los ejercicios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.exerciseIds.length === 0) {
      setError('Debes seleccionar al menos un ejercicio');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      let savedRoutine: WeeklyRoutine;
      
      if (isEditing && routine) {
        savedRoutine = await updateRoutine(routine.id, formData);
      } else {
        savedRoutine = await createRoutine(formData);
      }

      onRoutineSaved?.(savedRoutine);
      
      if (!onCancel) {
        router.push('/routines');
      }
      
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error inesperado al guardar la rutina');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExerciseToggle = (exerciseId: number) => {
    setFormData(prev => ({
      ...prev,
      exerciseIds: prev.exerciseIds.includes(exerciseId)
        ? prev.exerciseIds.filter(id => id !== exerciseId)
        : [...prev.exerciseIds, exerciseId]
    }));
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Editar Rutina' : 'Crear Nueva Rutina'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Día de la semana */}
          <div>
            <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 mb-2">
              Día de la semana
            </label>
            <select
              id="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={(e) => setFormData(prev => ({ ...prev, dayOfWeek: e.target.value as DayOfWeek }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {DAYS_OF_WEEK.map(day => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notas */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <input
              type="text"
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Ej: Rutina de fuerza, día de cardio..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Selección de ejercicios */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ejercicios ({formData.exerciseIds.length} seleccionados)
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto border border-gray-200 rounded-md p-4">
            {exercises.map(exercise => (
              <label
                key={exercise.id}
                className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.exerciseIds.includes(exercise.id)}
                  onChange={() => handleExerciseToggle(exercise.id)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {exercise.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {exercise.reps}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting || formData.exerciseIds.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isEditing ? 'Actualizando...' : 'Creando...'}
              </>
            ) : (
              isEditing ? 'Actualizar Rutina' : 'Crear Rutina'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}