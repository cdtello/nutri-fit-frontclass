'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUserById } from '@/modules/users/services/usersService';
import { ApiError } from '@/modules/users/services/usersService';
import type { User } from '@/types/api';

export default function UserDetailPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params.id as string);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error al cargar el usuario');
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Cargando usuario...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">❌ Error: {error}</p>
            <button
              onClick={() => router.push('/users')}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Volver a la lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8 text-gray-500">
            Usuario no encontrado
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <button
            onClick={() => router.push('/users')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            ← Volver a la lista
          </button>
        </div>
      </div>

      {/* Datos básicos del usuario */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Datos del Usuario</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <p className="mt-1 text-sm text-gray-900">{user.id}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <p className="mt-1 text-sm text-gray-900">{user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Edad</label>
              <p className="mt-1 text-sm text-gray-900">{user.age} años</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Peso</label>
              <p className="mt-1 text-sm text-gray-900">{user.weight} kg</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Altura</label>
              <p className="mt-1 text-sm text-gray-900">{user.height} cm</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de creación</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional si existe */}
      {user.profile && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Perfil</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Objetivo</label>
                <p className="mt-1 text-sm text-gray-900">{user.profile.goal}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Nivel de actividad</label>
                <p className="mt-1 text-sm text-gray-900">{user.profile.activityLevel}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Grasa corporal</label>
                <p className="mt-1 text-sm text-gray-900">{user.profile.bodyFat}%</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Masa muscular</label>
                <p className="mt-1 text-sm text-gray-900">{user.profile.muscleMass}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rutinas si existen */}
      {user.weeklyRoutines && user.weeklyRoutines.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Rutinas ({user.weeklyRoutines.length})</h2>
          <div className="space-y-2">
            {user.weeklyRoutines.map((routine) => (
              <div key={routine.id} className="border rounded p-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{routine.dayOfWeek}</p>
                    {routine.notes && (
                      <p className="text-sm text-gray-600">{routine.notes}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    routine.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {routine.completed ? 'Completada' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje para estudiantes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          💡 <strong>Para estudiantes:</strong> Esta página está lista para ser mejorada. 
          Pueden agregar más funcionalidades, mejorar el diseño, o agregar nuevas características.
        </p>
      </div>
    </div>
  );
}
