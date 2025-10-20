'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">
              🏋️ NutriFit
            </h1>
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            ¡Bienvenido a NutriFit! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Tu aplicación completa de gestión de fitness. Aquí podrás gestionar usuarios, rutinas, ejercicios y perfiles.
          </p>
          
          {/* Tarjetas de navegación */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link 
              href="/users"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border-2 border-transparent hover:border-blue-200"
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Usuarios</h3>
              <p className="text-gray-600 text-sm">
                Gestiona usuarios, edita perfiles y ve sus rutinas
              </p>
            </Link>
            
            <Link 
              href="/routines"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border-2 border-transparent hover:border-green-200"
            >
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Rutinas</h3>
              <p className="text-gray-600 text-sm">
                Crea y gestiona rutinas de ejercicio
              </p>
            </Link>
            
            <Link 
              href="/exercises"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border-2 border-transparent hover:border-purple-200"
            >
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-2">Ejercicios</h3>
              <p className="text-gray-600 text-sm">
                Administra la base de datos de ejercicios
              </p>
            </Link>
            
            <Link 
              href="/profiles"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border-2 border-transparent hover:border-orange-200"
            >
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-2">Perfiles</h3>
              <p className="text-gray-600 text-sm">
                Configura objetivos y niveles de actividad
              </p>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Estado del Proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-semibold text-green-600 mb-2">✅ Completado</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Backend con NestJS</li>
                  <li>• Base de datos SQLite</li>
                  <li>• API REST completa</li>
                  <li>• Tipos TypeScript</li>
                  <li>• Gestión de usuarios</li>
                  <li>• Formularios de edición</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">🔄 En desarrollo</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Interfaz de rutinas</li>
                  <li>• Gestión de ejercicios</li>
                  <li>• Perfiles de usuario</li>
                  <li>• Dashboard principal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}