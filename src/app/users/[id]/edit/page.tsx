'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UserEditForm } from '@/components/users';
import { getAllUsers } from '@/modules/users/services/usersService';
import type { User } from '@/types/api';

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Obtener todos los usuarios y buscar el que coincide con el ID
      const users = await getAllUsers();
      const foundUser = users.find(u => u.id === parseInt(userId));
      
      if (!foundUser) {
        setError('Usuario no encontrado');
        return;
      }
      
      setUser(foundUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuario');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId, loadUser]);

  const handleSave = () => {
    // Redirigir de vuelta a la lista de usuarios o al perfil
    router.push('/users');
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Cargando usuario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-2">
              <button
                onClick={loadUser}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Reintentar
              </button>
              <button
                onClick={() => router.push('/users')}
                className="w-full px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Volver a Usuarios
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Usuario no encontrado</h2>
          <p className="text-gray-600 mb-6">El usuario con ID {userId} no existe.</p>
          <button
            onClick={() => router.push('/users')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Volver a Usuarios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Editar Usuario: {user.name}
          </h1>
        </div>

        <UserEditForm
          user={user}
          onSave={() => handleSave()}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
