'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WeeklyRoutine, DayOfWeek } from '../../types/api';
import { getAllRoutines, completeRoutine, deleteRoutine } from '../../modules/routines/services/routinesService';
import { ApiError } from '../../modules/routines/services/routinesService';

interface RoutineListProps {
  userId?: number;
  showFilters?: boolean;
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

export default function RoutineList({ userId, showFilters = true }: RoutineListProps) {
  const [routines, setRoutines] = useState<WeeklyRoutine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    dayOfWeek: '',
    completed: '',
  });
  const router = useRouter();

  useEffect(() => {
    loadRoutines();
  }, [userId, filters]);

  const loadRoutines = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const filterParams: any = {};
      if (userId) filterParams.userId = userId;
      if (filters.dayOfWeek) filterParams.dayOfWeek = filters.dayOfWeek;
      if (filters.completed !== '') filterParams.completed = filters.completed === 'true';
      
      const routinesData = await getAllRoutines(filterParams);
      setRoutines(routinesData);
    } catch (err) {
      setError('Error al cargar las rutinas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteToggle = async (routineId: number, completed: boolean) => {
    try {
      await completeRoutine(routineId, completed);
      await loadRoutines(); // Recargar la lista
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al actualizar la rutina');
      }
    }
  };

  const handleDelete = async (routineId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta rutina?')) {
      return;
    }

    try {
      await deleteRoutine(routineId);
      await loadRoutines(); // Recargar la lista
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error al eliminar la rutina');
      }
    }
  };

  const handleViewRoutine = (routineId: number) => {
    router.push(`/routines/${routineId}`);
  };

  const handleEditRoutine = (routineId: number) => {
    router.push(`/routines/${routineId}/edit`);
  };

  const getDayLabel = (dayOfWeek: DayOfWeek) => {
    return DAYS_OF_WEEK.find(day => day.value === dayOfWeek)?.label || dayOfWeek;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="dayFilter" className="block text-sm font-medium text-gray-700 mb-2">
                Día de la semana
              </label>
              <select
                id="dayFilter"
                value={filters.dayOfWeek}
                onChange={(e) => setFilters(prev => ({ ...prev, dayOfWeek: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los días</option>
                {DAYS_OF_WEEK.map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="completedFilter" className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                id="completedFilter"
                value={filters.completed}
                onChange={(e) => setFilters(prev => ({ ...prev, completed: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="false">Pendientes</option>
                <option value="true">Completadas</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ dayOfWeek: '', completed: '' })}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Lista de rutinas */}
      <div className="space-y-4">
        {routines.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No hay rutinas disponibles</div>
            <button
              onClick={() => router.push('/routines/create')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Crear primera rutina
            </button>
          </div>
        ) : (
          routines.map(routine => (
            <div
              key={routine.id}
              className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                routine.completed ? 'border-green-500' : 'border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getDayLabel(routine.dayOfWeek)}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      routine.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {routine.completed ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>
                  
                  {routine.notes && (
                    <p className="text-gray-600 mb-3">{routine.notes}</p>
                  )}
                  
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">
                      {routine.exercises?.length || 0} ejercicio{(routine.exercises?.length || 0) !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {routine.exercises?.slice(0, 3).map(exercise => (
                      <span
                        key={exercise.id}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {exercise.name}
                      </span>
                    ))}
                    {(routine.exercises?.length || 0) > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{(routine.exercises?.length || 0) - 3} más
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleViewRoutine(routine.id)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Ver
                  </button>
                  
                  <button
                    onClick={() => handleEditRoutine(routine.id)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Editar
                  </button>
                  
                  <button
                    onClick={() => handleCompleteToggle(routine.id, !routine.completed)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      routine.completed
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {routine.completed ? 'Marcar Pendiente' : 'Completar'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(routine.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
