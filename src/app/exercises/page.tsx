// Página de lista de ejercicios (/exercises)
export default function ExercisesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Catálogo de Ejercicios</h2>
        <p className="text-gray-600">
          Aquí se mostrará el catálogo completo de ejercicios disponibles.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Para implementar:</strong> Usar el servicio exercisesService.getAllExercises() 
            y el componente ExerciseCard para mostrar cada ejercicio.
          </p>
        </div>
      </div>
    </div>
  );
}
