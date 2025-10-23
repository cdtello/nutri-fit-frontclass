'use client';

//Definir como se ve un usuario
interface User {
  name : string;
  email : string;
  id : number;
  age : number;
  weight : number;
  height : number;
}

// Se definen los props, la forma en que los componentes reciben datos
interface UserCardProps{
  user : User;
}

//Componente que muestra los datos del usuario
export default function UserCard({ user } : UserCardProps){
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {user?.name}{" "}
            {user.id && <span className="text-grey-500">(ID: {user.id})</span>}
          </h3>
        </div>
  
        <div className="p-4 bg-gray-50 rounded-lg">
          <p> <b> Email: </b> {user?.email}</p>
          <p> <b> Edad: </b> {user?.age} años</p>
          <p> <b> Peso: </b>{user?.weight} kg</p>
          <p> <b> Altura: </b>{user?.height} cm</p>
        </div>
      </div>
    );
}
