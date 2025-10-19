'use client';

import { useState } from 'react';
import type { User } from '@/types/api';
import { deleteUser } from '@/modules/users/services/usersService';

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onViewRoutines: (userId: number) => void;
  onRefresh: () => void;
}

export default function UserActions({ 
  user, 
  onEdit, 
  onDelete, 
  onViewRoutines, 
  onRefresh 
}: UserActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteUser(user.id);
      onDelete(user.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario. Inténtalo de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: 'Bajo peso', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-600' };
    return { category: 'Obesidad', color: 'text-red-600' };
  };

  const bmi = calculateBMI(user.weight, user.height);
  const bmiInfo = getBMICategory(bmi);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          👤 Acciones de Usuario
        </h2>
        <button
          onClick={onRefresh}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          title="Actualizar información"
        >
          🔄
        </button>
      </div>

      {/* Información del usuario */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Información Personal</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Nombre:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Edad:</span> {user.age} años</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Datos Físicos</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Peso:</span> {user.weight} kg</p>
              <p><span className="font-medium">Altura:</span> {user.height} cm</p>
              <p>
                <span className="font-medium">IMC:</span> 
                <span className={`ml-1 font-bold ${bmiInfo.color}`}>
                  {bmi} ({bmiInfo.category})
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>Miembro desde: {new Date(user.createdAt).toLocaleDateString()}</p>
            <p>Última actualización: {new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => onEdit(user)}
            className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <span className="mr-2">✏️</span>
            Editar Usuario
          </button>

          <button
            onClick={() => onViewRoutines(user.id)}
            className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            <span className="mr-2">🏋️</span>
            Ver Rutinas
          </button>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center justify-center w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            <span className="mr-2">🗑️</span>
            Eliminar Usuario
          </button>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Confirmar Eliminación
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres eliminar al usuario <strong>{user.name}</strong>? 
                Esta acción no se puede deshacer.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  disabled={isDeleting}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
