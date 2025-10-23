import { Profile } from '@/modules/profiles/types'; // ¡Cambiado a Profile!

interface ProfileCardProps {
  profile: Profile; // ¡Cambiado a Profile!
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{profile.user.name}</h3>
      <p className="text-md text-gray-700">Email: {profile.user.email}</p>
      <div className="mt-6">
        <p><strong>Objetivo:</strong> {profile.goal}</p>
        <p><strong>Nivel de Actividad:</strong> {profile.activityLevel}</p>
        <p><strong>Peso:</strong> {profile.weight} kg</p>
        <p><strong>Altura:</strong> {profile.height} cm</p>
        <p><strong>Edad:</strong> {profile.age} años</p>
      </div>
    </div>
  );
}