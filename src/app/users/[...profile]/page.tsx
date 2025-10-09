// Página de perfil dinámico (/users/123, /users/123/edit)
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profile: string[] }>;
}) {
  const { profile } = await params;
  const [userId, action] = profile;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          {action === 'edit' ? 'Editar Usuario' : 'Ver Usuario'} 
          {userId && ` (ID: ${userId})`}
        </h3>
        {action === 'edit' && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
            Modo Edición
          </span>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Ruta actual:</strong> /users/{profile.join('/')}
        </p>
        <p className="text-sm text-gray-600">
          💡 <strong>Para implementar:</strong> Usar usersService.getUserById({userId}) 
          y el componente UserProfile para mostrar/editar el usuario.
        </p>
      </div>
    </div>
  );
}
