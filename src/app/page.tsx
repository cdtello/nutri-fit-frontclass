export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          🏋️ Fitness App Frontend
        </h1>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-8">
            Bienvenido a la aplicación de fitness. Aquí podrás gestionar tus rutinas de ejercicio.
          </p>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Estado del Proyecto</h2>
            <p className="text-gray-600">
              ✅ Backend completado y funcionando<br/>
              ✅ Tipos TypeScript disponibles<br/>
              ✅ Estructura base del frontend lista<br/>
              🔄 Pendiente: Implementación de componentes
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}