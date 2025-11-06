'use client';

import { useForm } from 'react-hook-form';
import { Profile, UpdateProfileDto } from '@/modules/profiles/types';

interface ProfileFormProps {
  profile: Profile;
  onSubmit: (data: UpdateProfileDto) => void;
}

export default function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  const defaultFormValues: UpdateProfileDto = {
    goal: profile.goal,
    activityLevel: profile.activityLevel,
  };

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileDto>({
    defaultValues: defaultFormValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Objetivo */}
      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
          Objetivo
        </label>
        <select
          id="goal"
          {...register('goal', { required: 'El objetivo es requerido' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="">Selecciona un objetivo</option>
          <option value="LOSE_WEIGHT">Perder Peso</option>
          <option value="GAIN_MUSCLE">Ganar Músculo</option>
          <option value="MAINTAIN">Mantener</option>
        </select>
        {errors.goal && (
          <p className="mt-1 text-sm text-red-600">{errors.goal.message}</p>
        )}
      </div>

      {/* Nivel de Actividad */}
      <div>
        <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
          Nivel de Actividad
        </label>
        <select
          id="activityLevel"
          {...register('activityLevel', { required: 'El nivel de actividad es requerido' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="">Selecciona nivel de actividad</option>
          <option value="SEDENTARY">Sedentario</option>
          <option value="LIGHT">Ligero</option>
          <option value="MODERATE">Moderado</option>
          <option value="ACTIVE">Activo</option>
          <option value="VERY_ACTIVE">Muy Activo</option>
        </select>
        {errors.activityLevel && (
          <p className="mt-1 text-sm text-red-600">{errors.activityLevel.message}</p>
        )}
      </div>

      {/* Botón de Envío */}
      <div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}