'use client'; // Le indica a nest que esto se ejecuta en el navegador

import { useState } from 'react'; // Funcion useState que react usa para guardar y actualizar datos

export function UserForm({onSubmit}: { onSubmit: (data: any) => void}){
  // Declara un form que contiene los valores del formulario, setForm actualiza los valores
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
  });

  // Esta función se ejecuta cada vez que el usuario escribe algo en un cam
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Esta función se ejecuta al enviar el formulario (cuando se hace clic en el boton).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name: form.name,
      email: form.email,
      age: parseInt(form.age),
      weight: parseInt(form.weight),
      height: parseInt(form.height),
    };

    onSubmit(userData); 
    
    alert('Usuario creado');
    
    // Limpiar el formulario después de guardar
    setForm({
      name: '',
      email: '',
      age: '',
      weight: '',
      height: '',
    });
  };

  // Cuando haces clic en el botón Guardar Usuario, se dispara handleSubmit.
  return (
    <form onSubmit = {handleSubmit} className = "space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Crear Usuario</h2>

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="border rounded w-full p-2"
      />

      <input
        name="email"
        placeholder="Correo"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="border rounded w-full p-2"
      />

      <input
        name="age"
        placeholder="Edad"
        type="number"
        value={form.age}
        onChange={handleChange}
        className="border rounded w-full p-2"
      />

      <input
        name="weight"
        placeholder="Peso (kg)"
        type="number"
        value={form.weight}
        onChange={handleChange}
        className="border rounded w-full p-2"
      />

      <input
        name="height"
        placeholder="Altura (cm)"
        type="number"
        value={form.height}
        onChange={handleChange}
        className="border rounded w-full p-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Guardar Usuario
      </button>
    </form>
  );
};