'use client';

import { usePathname } from 'next/navigation';

// Layout para rutas /routines/*
export default function RoutinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Solo mostrar el título en la página principal de rutinas
  const showTitle = pathname === '/routines';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {showTitle && (
          <h1 className="text-3xl font-bold mb-8">📅 Gestión de Rutinas</h1>
        )}
        {children}
      </div>
    </div>
  );
}
