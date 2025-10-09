// Layout para rutas /exercises/*
export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">💪 Gestión de Ejercicios</h1>
        {children}
      </div>
    </div>
  );
}
