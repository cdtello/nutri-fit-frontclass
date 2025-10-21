'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RoutineList } from '../../components/routines';
import { WeeklyRoutine } from '../../types/api';
import { getAllRoutines, calculateRoutineProgress } from '../../modules/routines/services/routinesService';

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<WeeklyRoutine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const routinesData = await getAllRoutines();
      setRoutines(routinesData);
    } catch {
      setError('Error al cargar las rutinas');
    } finally {
      setIsLoading(false);
    }
  };

  const progress = calculateRoutineProgress(routines);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rutinas Semanales</h1>
              <p className="text-gray-600 mt-2">
                Gestiona tus rutinas de ejercicios organizadas por días de la semana
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/routines/create')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Rutina
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        {!isLoading && routines.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total de Rutinas</p>
                  <p className="text-2xl font-semibold text-gray-900">{progress.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completadas</p>
                  <p className="text-2xl font-semibold text-gray-900">{progress.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Progreso</p>
                  <p className="text-2xl font-semibold text-gray-900">{progress.percentage}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barra de progreso */}
        {!isLoading && routines.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Progreso Semanal</h3>
              <span className="text-sm text-gray-600">{progress.completed} de {progress.total} rutinas completadas</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={loadRoutines}
              className="ml-4 text-red-800 underline hover:text-red-900"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Lista de rutinas */}
        <RoutineList showFilters={true} />
      </div>
    </div>
  );
}