"use client";
import RoutineForm from "@/components/routines/RoutineForm";

// TODO: Reemplaza el userId fijo por el real desde sesión/logged user
const userId = 1;

export default function CreateRoutinePage() {
  return (
    <div className="container mx-auto p-6">
      <RoutineForm userId={userId} />
      {/* Si se quiere redirigir automaticamente tras crear, pasa onSuccess={() => { router.push("/routines") }} como prop al formulario */}
    </div>
  );
}