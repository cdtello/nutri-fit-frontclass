'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Profile, UpdateProfileDto, Goal, ActivityLevel } from '../../types/api';
import { updateProfile, getGoalDescription, getActivityLevelDescription } from '../../modules/profiles/services/profilesService';
import { ApiError } from '../../modules/profiles/services/profilesService';

interface ProfileFormProps {
  profile: Profile;
  userId: number;
  onProfileSaved?: (profile: Profile) => void;
  onCancel?: () => void;
}

const GOALS = [
  { value: Goal.LOSE_WEIGHT, label: 'Perder peso' },
  { value: Goal.GAIN_MUSCLE, label: 'Ganar músculo' },
  { value: Goal.MAINTAIN, label: 'Mantener peso' },
];

const ACTIVITY_LEVELS = [
  { value: ActivityLevel.SEDENTARY, label: 'Sedentario', description: 'Poco o ningún ejercicio' },
  { value: ActivityLevel.LIGHT, label: 'Ligero', description: 'Ejercicio 1-3 días/semana' },
  { value: ActivityLevel.MODERATE, label: 'Moderado', description: 'Ejercicio 3-5 días/semana' },
  { value: ActivityLevel.ACTIVE, label: 'Activo', description: 'Ejercicio 6-7 días/semana' },
  { value: ActivityLevel.VERY_ACTIVE, label: 'Muy activo', description: 'Ejercicio intenso diario' },
];

export default function ProfileForm({ 
  profile, 
  userId, 
  onProfileSaved, 
  onCancel 
}: ProfileFormProps) {
  const [formData, setFormData] = useState<UpdateProfileDto>({
    goal: profile.goal,
    activityLevel: profile.activityLevel,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setFormData({
      goal: profile.goal,
      activityLevel: profile.activityLevel,
    });
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);

      const updatedProfile = await updateProfile(userId, formData);

      onProfileSaved?.(updatedProfile);
      
      if (!onCancel) {
        router.push(`/profiles/${userId}`);
      }
      
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Error inesperado al actualizar el perfil');
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
          Editar Perfil
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Objetivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Objetivo de Fitness
            </label>
            <div className="space-y-2">
              {GOALS.map(goal => (
                <label
                  key={goal.value}
                  className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="goal"
                    value={goal.value}
                    checked={formData.goal === goal.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value as Goal }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{goal.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Nivel de actividad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Nivel de Actividad
            </label>
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map(level => (
                <label
                  key={level.value}
                  className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    value={level.value}
                    checked={formData.activityLevel === level.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, activityLevel: e.target.value as ActivityLevel }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{level.label}</div>
                    <div className="text-xs text-gray-500">{level.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Vista previa de cambios */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Vista previa</h3>
          <div className="space-y-1 text-sm text-blue-800">
            <p><strong>Objetivo:</strong> {getGoalDescription(formData.goal || profile.goal)}</p>
            <p><strong>Actividad:</strong> {getActivityLevelDescription(formData.activityLevel || profile.activityLevel)}</p>
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
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Actualizando...
              </>
            ) : (
              'Actualizar Perfil'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}