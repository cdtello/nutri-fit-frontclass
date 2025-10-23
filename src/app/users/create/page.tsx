'use client';

import { useState } from 'react';
import { UserForm } from '@/components/users/UserForm';
import { createUser } from '@/modules/users/services';

export default function UsersPage() {
  const [message, setMessage] = useState<string | null>(null);

  // 👉 Esta función se ejecuta cuando el usuario envía el formulario
  const handleCreateUser = async (data: any) => {
    try {
      // Aquí mandamos los datos del formulario al backend usando createUser
      const newUser = await createUser(data);
      
    } catch (error) {
      // Si hay un error (por ejemplo, backend caído o validación), lo mostramos
      setMessage('❌ Error al crear el usuario');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Crear Nuevo Usuario
      </h1>

      {/*Mostramos el mensaje si existe */}
      {message && (
        <div className="max-w-md mx-auto mb-4 bg-white shadow p-4 rounded text-center">
          {message}
        </div>
      )}

      {/*Aquí va el formulario que el usuario llena */}
      <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
        <UserForm onSubmit={handleCreateUser} />
      </div>
    </div>
  );
}
