'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProfileByUserId, ApiError } from '@/modules/profiles/services/profilesService';
import { getUserById } from '@/modules/users/services/usersService';
import ProfileForm from '@/components/profiles/ProfileForm';
import type { Profile, User } from '@/types/api';

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params.userId as string);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [userData, profileData] = await Promise.all([
        getUserById(userId),
        getProfileByUserId(userId)
      ]);
      
      setUser(userData);
      setProfile(profileData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar el perfil');
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId, loadData]);

  const handleProfileSaved = () => {
    router.push(`/profiles/${userId}`);
  };

  const handleCancel = () => {
    router.push(`/profiles/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/users')}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Volver a usuarios
            </button>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Perfil no encontrado</p>
          <button
            onClick={() => router.push('/users')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Volver a usuarios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <button
                onClick={() => router.push('/users')}
                className="text-blue-600 hover:text-blue-800"
              >
                Usuarios
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <button
                onClick={() => router.push(`/users/${userId}`)}
                className="text-blue-600 hover:text-blue-800"
              >
                {user.name}
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <button
                onClick={() => router.push(`/profiles/${userId}`)}
                className="text-blue-600 hover:text-blue-800"
              >
                Perfil
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900">Editar</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
              <p className="text-gray-600 mt-2">
                Actualiza los objetivos y nivel de actividad de {user.name}
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
        <ProfileForm 
          profile={profile}
          userId={userId}
          onProfileSaved={handleProfileSaved}
          onCancel={handleCancel}
        />

        {/* Información adicional */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Nota importante
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Los cambios en el perfil afectarán el cálculo de calorías recomendadas y las sugerencias de rutinas.
                  Asegúrate de que la información sea precisa para obtener los mejores resultados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}