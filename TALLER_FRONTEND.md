# 🎯 Taller Frontend en Clase - Fitness App

### 🎯 **Asignación de Endpoints por Grupo:**

**Total de endpoints: 21**  
**División: 3 endpoints por grupo**

#### **Grupo 1 - Users Básico** Hanna
- **Endpoints:**
  - `POST /users` - Crear usuario
  - `GET /users` - Listar usuarios  
  - `GET /users/:id` - Obtener usuario
- **Servicios Backend:**
  - `createUser(data: CreateUserDto): Promise<User>`
  - `getAllUsers(): Promise<User[]>` ✅ (ya implementado)
  - `getUserById(id: number): Promise<User>`
- **Componentes Visuales:**
  - `UserCard.tsx` - Tarjeta de usuario
  - `UserForm.tsx` - Formulario de usuario
  - `UserList.tsx` - Lista de usuarios
- **Páginas:**
  - `/users` - Lista de usuarios ✅ (ya implementada)
  - `/users/create` - Crear usuario
  - `/users/[id]` - Detalle de usuario

#### **Grupo 2 - Users Avanzado** Martin
- **Endpoints:**
  - `PATCH /users/:id` - Actualizar usuario
  - `DELETE /users/:id` - Eliminar usuario
  - `GET /users/:id/routines` - Rutinas del usuario
- **Servicios Backend:**
  - `updateUser(id: number, data: UpdateUserDto): Promise<User>`
  - `deleteUser(id: number): Promise<void>`
  - `getUserRoutines(id: number): Promise<WeeklyRoutine[]>`
- **Componentes Visuales:**
  - `UserEditForm.tsx` - Formulario de edición
  - `UserRoutinesList.tsx` - Lista de rutinas del usuario
  - `UserActions.tsx` - Acciones de usuario
- **Páginas:**
  - `/users/[id]/edit` - Editar usuario
  - `/users/[id]/routines` - Rutinas del usuario

#### **Grupo 3 - Profiles**Alejandro
- **Endpoints:**
  - `GET /profiles/:userId` - Obtener perfil
  - `PATCH /profiles/:userId` - Actualizar perfil
  - `POST /exercises` - Crear ejercicio (1 endpoint extra)
- **Servicios Backend:**
  - `getProfileByUserId(userId: number): Promise<Profile>`
  - `updateProfile(userId: number, data: UpdateProfileDto): Promise<Profile>`
  - `createExercise(data: CreateExerciseDto): Promise<Exercise>`
- **Componentes Visuales:**
  - `ProfileCard.tsx` - Tarjeta de perfil
  - `ProfileForm.tsx` - Formulario de perfil
  - `ExerciseForm.tsx` - Formulario de ejercicio
- **Páginas:**
  - `/profiles/[userId]` - Detalle de perfil
  - `/profiles/[userId]/edit` - Editar perfil
  - `/exercises/create` - Crear ejercicio

#### **Grupo 4 - Exercises Básico**Miguel
- **Endpoints:**
  - `GET /exercises` - Listar ejercicios
  - `GET /exercises/:id` - Obtener ejercicio
  - `PATCH /exercises/:id` - Actualizar ejercicio
- **Servicios Backend:**
  - `getAllExercises(): Promise<Exercise[]>`
  - `getExerciseById(id: number): Promise<Exercise>`
  - `updateExercise(id: number, data: UpdateExerciseDto): Promise<Exercise>`
- **Componentes Visuales:**
  - `ExerciseList.tsx` - Lista de ejercicios
  - `ExerciseCard.tsx` - Tarjeta de ejercicio
  - `ExerciseEditForm.tsx` - Formulario de edición
- **Páginas:**
  - `/exercises` - Lista de ejercicios
  - `/exercises/[id]` - Detalle de ejercicio
  - `/exercises/[id]/edit` - Editar ejercicio

#### **Grupo 5 - Exercises Avanzado + Routines Básico**Jose David
- **Endpoints:**
  - `DELETE /exercises/:id` - Eliminar ejercicio
  - `POST /routines` - Crear rutina
  - `GET /routines` - Listar rutinas
- **Servicios Backend:**
  - `deleteExercise(id: number): Promise<void>`
  - `createRoutine(data: CreateRoutineDto): Promise<WeeklyRoutine>`
  - `getAllRoutines(filters?: { dayOfWeek?: string; completed?: boolean; userId?: number }): Promise<WeeklyRoutine[]>`
- **Componentes Visuales:**
  - `ExerciseActions.tsx` - Acciones de ejercicio
  - `RoutineForm.tsx` - Formulario de rutina
  - `RoutineList.tsx` - Lista de rutinas
- **Páginas:**
  - `/exercises/[id]/delete` - Eliminar ejercicio
  - `/routines` - Lista de rutinas
  - `/routines/create` - Crear rutina

#### **Grupo 6 - Routines Avanzado**Juan
- **Endpoints:**
  - `GET /routines/:id` - Obtener rutina
  - `PATCH /routines/:id` - Actualizar rutina
  - `DELETE /routines/:id` - Eliminar rutina
- **Servicios Backend:**
  - `getRoutineById(id: number): Promise<WeeklyRoutine>`
  - `updateRoutine(id: number, data: UpdateRoutineDto): Promise<WeeklyRoutine>`
  - `deleteRoutine(id: number): Promise<void>`
- **Componentes Visuales:**
  - `RoutineCard.tsx` - Tarjeta de rutina
  - `RoutineEditForm.tsx` - Formulario de edición
  - `RoutineActions.tsx` - Acciones de rutina
- **Páginas:**
  - `/routines/[id]` - Detalle de rutina
  - `/routines/[id]/edit` - Editar rutina
  - `/routines/[id]/delete` - Eliminar rutina

#### **Grupo 7 - Routines Especiales**Esneider
- **Endpoints:**
  - `PATCH /routines/:id/complete` - Completar rutina
  - `POST /routines/:id/exercises` - Agregar ejercicio
  - `DELETE /routines/:id/exercises/:exerciseId` - Quitar ejercicio
- **Servicios Backend:**
  - `completeRoutine(id: number, completed: boolean): Promise<WeeklyRoutine>`
  - `addExerciseToRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine>`
  - `removeExerciseFromRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine>`
- **Componentes Visuales:**
  - `RoutineCompletion.tsx` - Completar rutina
  - `ExerciseSelector.tsx` - Selector de ejercicios
  - `RoutineExerciseManager.tsx` - Gestor de ejercicios
- **Páginas:**
  - `/routines/[id]/complete` - Completar rutina
  - `/routines/[id]/exercises` - Gestionar ejercicios

## 🚀 Instrucciones de Implementación

### 1. **Configuración Inicial**
```bash
# Clonar el repositorio
git clone https://github.com/cdtello/nutri-fit-frontclass.git
cd nutri-fit-frontclass

# Instalar dependencias
npm install

# Verificar que el backend esté corriendo en puerto 3001
# Iniciar el frontend
npm run dev
```

### 2. **Estructura de Archivos a Implementar**

#### **Servicios (src/modules/[modulo]/services/)**
- Implementar las funciones comentadas en cada servicio
- Seguir el patrón de `getAllUsers()` ya implementado
- Usar `fetch` con el proxy `/api` configurado

#### **Componentes (src/components/[modulo]/)**
- Crear componentes React funcionales
- Usar TypeScript con tipos definidos en `src/types/api.ts`
- Aplicar estilos con Tailwind CSS
- Implementar manejo de estados (loading, error, success)

#### **Páginas (src/app/[modulo]/)**
- Usar Next.js App Router
- Implementar Server Components cuando sea posible
- Manejar parámetros dinámicos con `await params`

### 3. **Patrones de Implementación**

#### **Servicio API (Ejemplo)**
```typescript
export async function getUserById(id: number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new ApiError(response.status, 'Error al obtener usuario');
    }
    return response.json();
  } catch (error) {
    console.error('Error en getUserById:', error);
    throw error;
  }
}
```



**¡Éxito en el desarrollo! 🚀**
