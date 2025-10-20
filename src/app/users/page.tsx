'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllUsers } from '@/modules/users/services/usersService';
import type { User } from '@/types/api';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Cargando usuarios...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">❌ Error: {error}</p>
            <p className="text-red-600 text-sm mt-2">
              Asegúrate de que el backend esté ejecutándose en http://localhost:3001
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              🏋️ NutriFit
            </Link>
            <div className="flex space-x-4">
              <Link 
                href="/users" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                👥 Usuarios
              </Link>
              <Link 
                href="/routines" 
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                📅 Rutinas
              </Link>
              <Link 
                href="/exercises" 
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                💪 Ejercicios
              </Link>
              <Link 
                href="/profiles" 
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                👤 Perfiles
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">👥 Gestión de Usuarios</h2>
            <div className="text-sm text-gray-500">
              Total: {users.length} usuario(s)
            </div>
          </div>
          
          {users.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">No hay usuarios registrados</h3>
              <p>Los usuarios aparecerán aquí cuando se registren en el sistema.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">✅ Conexión exitosa con el backend!</p>
                <p className="text-green-600 text-sm mt-1">
                  Se encontraron {users.length} usuario(s) en la base de datos
                </p>
              </div>
              
              <div className="grid gap-6">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-800 mb-2">{user.name}</h3>
                        <p className="text-gray-600 mb-3">{user.email}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Edad:</span> {user.age} años
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Peso:</span> {user.weight} kg
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Altura:</span> {user.height} cm
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-gray-500 ml-4">
                        <p className="font-medium">ID: {user.id}</p>
                        <p>Creado: {new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {user.profile && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">📋 Perfil</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Objetivo:</span> {user.profile.goal}
                          </div>
                          <div>
                            <span className="font-medium">Nivel de actividad:</span> {user.profile.activityLevel}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {user.weeklyRoutines && user.weeklyRoutines.length > 0 && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">📅 Rutinas</h4>
                        <div className="text-sm">
                          <span className="font-medium">Total:</span> {user.weeklyRoutines.length} rutinas
                          <span className="text-gray-500 ml-2">
                            ({user.weeklyRoutines.filter(r => r.completed).length} completadas)
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Botones de acción */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                      <Link
                        href={`/users/${user.id}/edit`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar Usuario
                      </Link>
                      
                      <Link
                        href={`/users/${user.id}/routines`}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Ver Rutinas
                      </Link>
                      
                      <Link
                        href={`/users/${user.id}`}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
