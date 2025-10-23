'use client';

import type { User } from '@/types/api';

interface Props {
  users: User[];
}

export function UserList({ users }: Props) {
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
                <div key={user.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Edad: {user.age} años</p>
                        <p>Peso: {user.weight} kg</p>
                        <p>Altura: {user.height} cm</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
