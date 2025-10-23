'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateExerciseDto, Exercise } from '../../types/api';
import { createExercise } from '../../modules/exercises/services/exercisesService';
import { ApiError } from '../../modules/exercises/services/exercisesService';

interface ExerciseFormProps {
  onExerciseSaved?: (exercise: Exercise) => void;
  onCancel?: () => void;
}

export default function ExerciseForm({ 
  onExerciseSaved, 
  onCancel 
}: ExerciseFormProps) {
  const [formData, setFormData] = useState<CreateExerciseDto>({
    name: '',
    reps: '',
    videoUrl: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre del ejercicio es obligatorio');
      return;
    }
    
    if (!formData.reps.trim()) {
      setError('Las repeticiones son obligatorias');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const newExercise = await createExercise(formData);

      onExerciseSaved?.(newExercise);
      
      if (!onCancel) {
        router.push('/exercises');
      }
      
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error inesperado al crear el ejercicio');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Crear Nuevo Ejercicio
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Nombre del ejercicio */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del ejercicio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Press de banca, Sentadilla, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Ingresa un nombre descriptivo para el ejercicio
            </p>
          </div>

          {/* Repeticiones */}
          <div>
            <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-2">
              Repeticiones/Series <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="reps"
              value={formData.reps}
              onChange={(e) => setFormData(prev => ({ ...prev, reps: e.target.value }))}
              placeholder="Ej: 3x12, 4x8-10, 30 segundos, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Especifica las series y repeticiones (puede ser flexible)
            </p>
          </div>

          {/* URL del video */}
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL del video (opcional)
            </label>
            <input
              type="url"
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enlace a un video tutorial del ejercicio (YouTube, Vimeo, etc.)
            </p>
          </div>
        </div>

        {/* Vista previa */}
        {(formData.name || formData.reps) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Vista previa</h3>
            <div className="space-y-1">
              {formData.name && (
                <p className="text-sm">
                  <strong>Nombre:</strong> {formData.name}
                </p>
              )}
              {formData.reps && (
                <p className="text-sm">
                  <strong>Repeticiones:</strong> {formData.reps}
                </p>
              )}
              {formData.videoUrl && (
                <p className="text-sm">
                  <strong>Video:</strong>{' '}
                  <a 
                    href={formData.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Ver enlace
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

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
            disabled={isSubmitting || !formData.name.trim() || !formData.reps.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Ejercicio
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}