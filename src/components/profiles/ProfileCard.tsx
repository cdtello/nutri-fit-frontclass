'use client';

import { Profile, User } from '../../types/api';
import { 
  getGoalDescription, 
  getActivityLevelDescription,
  calculateBMI,
  getBMICategory,
  calculateCalorieNeeds
} from '../../modules/profiles/services/profilesService';

interface ProfileCardProps {
  profile: Profile;
  user: User;
  onEdit?: () => void;
}

export default function ProfileCard({ profile, user, onEdit }: ProfileCardProps) {
  const bmi = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(bmi);
  const calorieNeeds = calculateCalorieNeeds(
    user.weight,
    user.height,
    user.age,
    profile.activityLevel,
    profile.goal
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-blue-100">{user.email}</p>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Datos básicos */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Datos Básicos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-500">Edad</p>
              <p className="text-xl font-semibold text-gray-900">{user.age} años</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-500">Peso</p>
              <p className="text-xl font-semibold text-gray-900">{user.weight} kg</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-500">Altura</p>
              <p className="text-xl font-semibold text-gray-900">{user.height} cm</p>
            </div>
            <div className={`rounded-lg p-3 ${
              bmiCategory === 'Peso normal' ? 'bg-green-50' : 
              bmiCategory === 'Sobrepeso' ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              <p className="text-sm text-gray-500">IMC</p>
              <p className="text-xl font-semibold text-gray-900">{bmi}</p>
              <p className="text-xs text-gray-600 mt-1">{bmiCategory}</p>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Objetivos y Actividad</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Objetivo</p>
                <p className="font-semibold text-gray-900">{getGoalDescription(profile.goal)}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Nivel de Actividad</p>
                <p className="font-semibold text-gray-900">{getActivityLevelDescription(profile.activityLevel)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Necesidades calóricas */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Necesidades Nutricionales</h3>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calorías diarias recomendadas</p>
                <p className="text-3xl font-bold text-purple-600">{calorieNeeds}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Basado en tu objetivo de {getGoalDescription(profile.goal).toLowerCase()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Fechas */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="text-gray-500">Perfil creado</p>
              <p className="font-medium">{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Última actualización</p>
              <p className="font-medium">{new Date(profile.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}