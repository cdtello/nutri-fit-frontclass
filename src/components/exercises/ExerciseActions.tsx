'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Exercise } from '../../types/api';
import { deleteExercise } from '../../modules/exercises/services/exercisesService';
import { ApiError } from '../../modules/exercises/services/exercisesService';

interface ExerciseActionsProps {
  exercise: Exercise;
  onExerciseDeleted?: () => void;
}

export default function ExerciseActions({ 
  exercise, 
  onExerciseDeleted
}: ExerciseActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      await deleteExercise(exercise.id);
      
      // Notificar al componente padre
      onExerciseDeleted?.();
      
      // Cerrar modal
      setShowDeleteModal(false);
      
      // Redirigir a la lista de ejercicios
      router.push('/exercises');
      
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error inesperado al eliminar el ejercicio');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/exercises/${exercise.id}/edit`);
  };

  const handleView = () => {
    router.push(`/exercises/${exercise.id}`);
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Ver
        </button>
        
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Editar
        </button>
        
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar eliminación
            </h3>
            
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar el ejercicio &quot;{exercise.name}&quot;? 
              Esta acción no se puede deshacer.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Eliminando...
                  </>
                ) : (
                  'Eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
