// Página de lista de rutinas (/routines)
export default function RoutinesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Rutinas Semanales</h2>
        <p className="text-gray-600">
          Aquí se mostrarán todas las rutinas semanales organizadas por día.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Para implementar:</strong> Usar el servicio routinesService.getAllRoutines() 
            y el componente WeeklySchedule para mostrar las rutinas.
          </p>
        </div>
      </div>
    </div>
  );
}
