'use client';

import { useState, useEffect } from 'react';
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
              Asegúrate de que el backend esté ejecutándose en http://34.229.144.19:3000
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
        
        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay usuarios registrados
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">✅ Conexión exitosa con el backend!</p>
              <p className="text-green-600 text-sm mt-1">
                Se encontraron {users.length} usuario(s) en la base de datos
              </p>
            </div>
            
            <div className="grid gap-4">
              {users.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-blue-600 hover:text-blue-800">
                        <a href={`/users/${user.id}`} className="hover:underline">
                          {user.name}
                        </a>
                      </h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Edad: {user.age} años</p>
                        <p>Peso: {user.weight} kg</p>
                        <p>Altura: {user.height} cm</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500 ml-4">
                      <p>ID: {user.id}</p>
                      <p>Creado: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {user.profile && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-sm">
                        <span className="font-medium">Objetivo:</span> {user.profile.goal}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Actividad:</span> {user.profile.activityLevel}
                      </div>
                    </div>
                  )}
                  
                  {user.weeklyRoutines && user.weeklyRoutines.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-sm">
                        <span className="font-medium">Rutinas:</span> {user.weeklyRoutines.length}
                        <span className="text-gray-500 ml-2">
                          ({user.weeklyRoutines.filter(r => r.completed).length} completadas)
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <a
                      href={`/users/${user.id}`}
                      className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      Ver detalles →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
