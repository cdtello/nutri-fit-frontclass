'use client';

import { useRouter } from 'next/navigation';
import ExerciseForm from '@/components/exercises/ExerciseForm';
import type { Exercise } from '@/types/api';

export default function CreateExercisePage() {
  const router = useRouter();

  const handleExerciseSaved = (exercise: Exercise) => {
    router.push('/exercises');
  };

  const handleCancel = () => {
    router.push('/exercises');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <button
                onClick={() => router.push('/')}
                className="text-blue-600 hover:text-blue-800"
              >
                Inicio
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <button
                onClick={() => router.push('/exercises')}
                className="text-blue-600 hover:text-blue-800"
              >
                Ejercicios
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900">Crear</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Ejercicio</h1>
              <p className="text-gray-600 mt-2">
                Agrega un nuevo ejercicio al catálogo para usarlo en las rutinas
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
        <ExerciseForm 
          onExerciseSaved={handleExerciseSaved}
          onCancel={handleCancel}
        />

        {/* Guía de uso */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Consejos para crear ejercicios
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Nombre descriptivo:</strong> Usa nombres claros que indiquen el grupo muscular o movimiento (ej: "Press de banca inclinado", "Sentadilla búlgara")</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Formato flexible:</strong> Las repeticiones pueden ser en formato "3x12", "4x8-10", "30 segundos", "hasta el fallo", etc.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Videos tutoriales:</strong> Agrega enlaces de YouTube o Vimeo para ayudar a los usuarios a ejecutar correctamente el ejercicio</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Organización:</strong> Los ejercicios se organizan automáticamente por categorías según su nombre</span>
            </li>
          </ul>
        </div>

        {/* Ejemplos */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            📝 Ejemplos de ejercicios bien definidos
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-medium text-gray-900">Press de banca con barra</p>
              <p className="text-sm text-gray-600">Repeticiones: 4x8-10</p>
              <p className="text-xs text-blue-600">Video: https://www.youtube.com/watch?v=...</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-medium text-gray-900">Plancha abdominal</p>
              <p className="text-sm text-gray-600">Repeticiones: 3x30-45 segundos</p>
              <p className="text-xs text-blue-600">Video: https://www.youtube.com/watch?v=...</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-medium text-gray-900">Curl de bíceps con mancuernas</p>
              <p className="text-sm text-gray-600">Repeticiones: 3x12-15</p>
              <p className="text-xs text-blue-600">Video: https://www.youtube.com/watch?v=...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 