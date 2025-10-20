'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Exercise } from '../../../types/api';
import { getExerciseById, deleteExercise } from '../../../modules/exercises/services/exercisesService';
import { ApiError } from '../../../modules/exercises/services/exercisesService';

export default function DeleteExercisePage() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const exerciseId = parseInt(params.id as string);

  useEffect(() => {
    if (exerciseId) {
      loadExercise();
    }
  }, [exerciseId]);

  const loadExercise = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const exerciseData = await getExerciseById(exerciseId);
      setExercise(exerciseData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al cargar el ejercicio');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!exercise) return;

    try {
      setIsDeleting(true);
      setError(null);
      
      await deleteExercise(exercise.id);
      
      // Redirigir a la lista de ejercicios después de eliminar
      router.push('/exercises');
      
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al eliminar el ejercicio');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={() => router.push('/exercises')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Volver a ejercicios
          </button>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-lg mb-4">Ejercicio no encontrado</div>
          <button
            onClick={() => router.push('/exercises')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Volver a ejercicios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Confirmar Eliminación
            </h1>
            <p className="text-gray-600">
              Esta acción no se puede deshacer
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Información del Ejercicio
            </h2>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Nombre:</span>
                <p className="text-gray-900">{exercise.name}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Repeticiones:</span>
                <p className="text-gray-900">{exercise.reps}</p>
              </div>
              
              {exercise.videoUrl && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Video:</span>
                  <p className="text-gray-900">
                    <a 
                      href={exercise.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Ver video
                    </a>
                  </p>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-500">Rutinas asociadas:</span>
                <p className="text-gray-900">
                  {exercise.weeklyRoutines?.length || 0} rutina{(exercise.weeklyRoutines?.length || 0) !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Advertencia
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Al eliminar este ejercicio, también se eliminará de todas las rutinas donde esté incluido. 
                    Esta acción no se puede deshacer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={handleCancel}
              disabled={isDeleting}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Eliminando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar Ejercicio
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
