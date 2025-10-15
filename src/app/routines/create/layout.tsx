export default function RoutinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">📅 Gestión de Rutinas</h1>
        {children}
      </div>
    </div>
  );
}
