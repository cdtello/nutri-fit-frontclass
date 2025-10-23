'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types/api';
import { getAllUsers } from '@/modules/users/services';
import { UserList } from '@/components/users/UserList';

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
          <div className="flex items-center justify-center py-8 text-gray-500">
            Cargando usuarios...
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

  return <UserList users={users} />;
}
