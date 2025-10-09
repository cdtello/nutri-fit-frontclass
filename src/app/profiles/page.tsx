// Página de gestión de perfiles (/profiles)
export default function ProfilesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Perfiles de Usuario</h2>
        <p className="text-gray-600">
          Aquí se gestionarán los perfiles de usuario con sus objetivos y métricas de salud.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Para implementar:</strong> Usar el servicio profilesService.getProfileByUserId() 
            y el componente ProfileCard para mostrar los perfiles.
          </p>
        </div>
      </div>
    </div>
  );
}
