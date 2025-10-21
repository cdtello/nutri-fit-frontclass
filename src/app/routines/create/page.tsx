'use client';

import { useRouter } from 'next/navigation';
import RoutineForm from '../../../components/routines/RoutineForm';

export default function CreateRoutinePage() {
  const router = useRouter();

  const handleRoutineSaved = () => {
    // Redirigir a la lista de rutinas después de crear
    router.push('/routines');
  };

  const handleCancel = () => {
    router.push('/routines');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Rutina</h1>
              <p className="text-gray-600 mt-2">
                Configura una nueva rutina de ejercicios para un día específico de la semana
              </p>
            </div>
            
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>

        {/* Formulario */}
        <RoutineForm 
          userId={1} // TODO: Obtener del contexto de usuario autenticado
          onRoutineSaved={handleRoutineSaved}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
