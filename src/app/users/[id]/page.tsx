'use client';
import { getUserById } from "@/modules/users/services";
import { useParams } from "next/navigation"
import { User } from "@/types/api";
import { useEffect, useState } from "react";
import { UserCard } from '@/components/users';

// Página de perfil dinámico (/users/123, /users/123/edit)
export default function UserByIdPage() {
  const params = useParams();
  const userId = parseInt(params.id as string)
  console.log(userId)
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            setLoading(true)
            const data = await getUserById(userId);
            setUser(data);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, [userId]);
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

  if(!user){
    return<div>
      <p>Usuario no enontrado</p>
    </div>
  }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      <UserCard user={user} />
    </div>
  );
}
