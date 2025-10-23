'use client';

import { useForm } from 'react-hook-form';
import { Profile, UpdateProfileDto } from '@/modules/profiles/types';

interface ProfileFormProps {
  profile: Profile;
  onSubmit: (data: UpdateProfileDto) => void;
}

export default function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  const defaultFormValues: UpdateProfileDto = {
    weight: profile.weight,
    height: profile.height,
    age: profile.age,
    goal: profile.goal,
    activityLevel: profile.activityLevel,
  };

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileDto>({
    defaultValues: defaultFormValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Peso */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Peso (kg)
        </label>
        <input
          id="weight"
          type="number"
          step="0.1"
          {...register('weight', { 
            required: 'El peso es requerido',
            min: { value: 20, message: 'Peso mínimo: 20 kg' },
            max: { value: 300, message: 'Peso máximo: 300 kg' }
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {errors.weight && (
          <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
        )}
      </div>

      {/* Altura */}
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Altura (cm)
        </label>
        <input
          id="height"
          type="number"
          {...register('height', { 
            required: 'La altura es requerida',
            min: { value: 100, message: 'Altura mínima: 100 cm' },
            max: { value: 250, message: 'Altura máxima: 250 cm' }
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {errors.height && (
          <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
        )}
      </div>

      {/* Edad */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Edad (años)
        </label>
        <input
          id="age"
          type="number"
          {...register('age', { 
            required: 'La edad es requerida',
            min: { value: 10, message: 'Edad mínima: 10 años' },
            max: { value: 120, message: 'Edad máxima: 120 años' }
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

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