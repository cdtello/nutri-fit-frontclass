'use client';

import { useState, useEffect } from 'react';
import type { WeeklyRoutine, DayOfWeek, Exercise } from '@/types/api';
import { getUserRoutines } from '@/modules/users/services/usersService';

interface UserRoutinesListProps {
  userId: number;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

const DAY_COLORS: Record<DayOfWeek, string> = {
  MONDAY: 'bg-red-100 text-red-800',
  TUESDAY: 'bg-orange-100 text-orange-800',
  WEDNESDAY: 'bg-yellow-100 text-yellow-800',
  THURSDAY: 'bg-green-100 text-green-800',
  FRIDAY: 'bg-blue-100 text-blue-800',
  SATURDAY: 'bg-purple-100 text-purple-800',
  SUNDAY: 'bg-pink-100 text-pink-800',
};

export default function UserRoutinesList({ userId }: UserRoutinesListProps) {
  const [routines, setRoutines] = useState<WeeklyRoutine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRoutines();
  }, [userId]);

  const loadRoutines = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userRoutines = await getUserRoutines(userId);
      setRoutines(userRoutines);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar rutinas');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRoutineComplete = (routineId: number) => {
    setRoutines(prev => 
      prev.map(routine => 
        routine.id === routineId 
          ? { ...routine, completed: !routine.completed }
          : routine
      )
    );
  };

  const getCompletionStats = () => {
    const total = routines.length;
    const completed = routines.filter(r => r.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getCompletionStats();

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-gray-600">Cargando rutinas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="text-sm">❌ {error}</p>
          <button 
            onClick={loadRoutines}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          🏋️ Rutinas del Usuario
        </h2>
        <button 
          onClick={loadRoutines}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          🔄 Actualizar
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Total Rutinas</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-800">Completadas</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-sm text-orange-800">Pendientes</div>
        </div>
      </div>

      {/* Lista de rutinas */}
      {routines.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📅</div>
          <p>No hay rutinas registradas para este usuario</p>
        </div>
      ) : (
        <div className="space-y-4">
          {routines.map((routine) => (
            <div 
              key={routine.id} 
              className={`border rounded-lg p-4 transition-all duration-200 ${
                routine.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleRoutineComplete(routine.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      routine.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {routine.completed && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${DAY_COLORS[routine.dayOfWeek]}`}>
                        {DAY_LABELS[routine.dayOfWeek]}
                      </span>
                      {routine.completed && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          ✅ Completada
                        </span>
                      )}
                    </div>
                    
                    {routine.notes && (
                      <p className="text-sm text-gray-600 mt-1">{routine.notes}</p>
                    )}
                  </div>
                </div>

                <div className="text-right text-sm text-gray-500">
                  <div>Creada: {new Date(routine.createdAt).toLocaleDateString()}</div>
                  {routine.updatedAt !== routine.createdAt && (
                    <div>Actualizada: {new Date(routine.updatedAt).toLocaleDateString()}</div>
                  )}
                </div>
              </div>

              {/* Ejercicios de la rutina */}
              {routine.exercises && routine.exercises.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Ejercicios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {routine.exercises.map((exercise: Exercise) => (
                      <span 
                        key={exercise.id}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {exercise.name} ({exercise.reps})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
