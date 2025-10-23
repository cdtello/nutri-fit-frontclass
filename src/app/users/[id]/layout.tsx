// Layout para rutas dinámicas de perfiles
export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Perfil de Usuario</h2>
          {children}
        </div>
      </div>
    );
  }
  