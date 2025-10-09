# 🎯 Fitness App Frontend - Semilla para Estudiantes

## 📋 Proceso de Creación de la Semilla

### 1. Creación del Proyecto Next.js
```bash
cd /Users/ctelloruiz/Desktop/Semestre\ 1/NewProject
npx create-next-app@latest fitness-app-frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

**Configuración elegida:**
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ ESLint
- ✅ App Router
- ✅ src/ directory
- ✅ Import alias "@/*"

### 2. Estructura del Proyecto Completa
```
fitness-app-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx          # Página de inicio (/)
│   │   ├── globals.css       # Estilos globales
│   │   └── users/            # Módulo de usuarios
│   │       ├── layout.tsx    # Layout para /users/*
│   │       ├── page.tsx      # Lista de usuarios (/users)
│   │       └── [...profile]/  # Rutas dinámicas
│   │           ├── layout.tsx # Layout para perfiles
│   │           └── page.tsx   # Página de perfil dinámico
│   │   ├── exercises/        # Módulo de ejercicios
│   │   │   ├── layout.tsx    # Layout para /exercises/*
│   │   │   └── page.tsx      # Catálogo de ejercicios (/exercises)
│   │   ├── routines/         # Módulo de rutinas
│   │   │   ├── layout.tsx    # Layout para /routines/*
│   │   │   └── page.tsx      # Rutinas semanales (/routines)
│   │   └── profiles/         # Módulo de perfiles
│   │       ├── layout.tsx    # Layout para /profiles/*
│   │       └── page.tsx      # Gestión de perfiles (/profiles)
│   ├── components/            # Componentes UI
│   │   ├── index.ts         # Exportaciones centralizadas
│   │   ├── shared/          # Componentes reutilizables
│   │   │   ├── Header.tsx   # Navegación principal
│   │   │   ├── Footer.tsx   # Pie de página
│   │   │   └── index.ts     # Barrel exports
│   │   ├── home/            # Componentes del home
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── TeamPreview.tsx
│   │   │   ├── SectionContainer.tsx
│   │   │   └── index.ts
│   │   └── users/           # Componentes de usuarios
│   │       ├── UserCard.tsx
│   │       ├── UserForm.tsx
│   │       ├── UserProfile.tsx
│   │       └── index.ts
│   ├── exercises/       # Componentes de ejercicios
│   │   ├── ExerciseCard.tsx
│   │   ├── ExerciseForm.tsx
│   │   ├── ExerciseList.tsx
│   │   └── index.ts
│   ├── routines/        # Componentes de rutinas
│   │   ├── RoutineCard.tsx
│   │   ├── RoutineForm.tsx
│   │   ├── WeeklySchedule.tsx
│   │   └── index.ts
│   └── profiles/        # Componentes de perfiles
│       ├── ProfileCard.tsx
│       ├── ProfileForm.tsx
│       ├── HealthMetrics.tsx
│       └── index.ts
│   ├── modules/              # Lógica de negocio
│   │   ├── home/
│   │   │   ├── index.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   ├── users/
│   │   │   ├── index.ts
│   │   │   ├── services/
│   │   │   │   ├── usersService.ts
│   │   │   │   └── index.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   ├── exercises/
│   │   │   ├── index.ts
│   │   │   ├── services/
│   │   │   │   ├── exercisesService.ts
│   │   │   │   └── index.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   ├── routines/
│   │   │   ├── index.ts
│   │   │   ├── services/
│   │   │   │   ├── routinesService.ts
│   │   │   │   └── index.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   └── profiles/
│   │       ├── index.ts
│   │       ├── services/
│   │       │   ├── profilesService.ts
│   │       │   └── index.ts
│   │       └── types/
│   │           └── index.ts
│   ├── lib/                  # Utilidades
│   │   └── utils.ts
│   └── types/                # Tipos globales
│       └── api.ts           # Tipos del backend
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts           # ✅ Proxy configurado
└── README.md
```

### 3. Configuración Base
- **Framework:** Next.js 15.5.4
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **HTTP Client:** Fetch nativo (sin axios)
- **State Management:** React hooks + Context API
- **Proxy:** Configurado para evitar CORS

### 4. Integración con Backend
- **API Base URL:** `http://localhost:3001`
- **Proxy Routes:** `/api/*` → `http://localhost:3001/*`
- **Documentación:** Ver `../fitness-app-backend/API_DOCUMENTATION.md`
- **Tipos:** Disponibles en `src/types/api.ts`

### 5. Estado Actual
✅ **Completado:**
- Estructura completa de carpetas creada
- Tipos TypeScript del backend configurados
- Página principal básica implementada
- Configuración de Tailwind CSS lista
- Proxy configurado en next.config.ts
- Barrel exports configurados
- Servicio de usuarios implementado
- Rutas dinámicas configuradas
- Utilidades básicas creadas

🔄 **Pendiente (para los estudiantes):**
- Implementar funciones CRUD en los servicios (comentadas como guía)
- Implementar componentes UI específicos
- Crear páginas adicionales
- Integrar servicios con componentes
- Añadir manejo de estado global

## 📁 **Estructura del Directorio `src/`**

#### 🎨 **`/src/app/` - Next.js App Router**
```
app/
├── layout.tsx             # Layout principal de la aplicación
├── page.tsx              # Página de inicio (/)
├── globals.css           # Estilos globales
└── users/                # Módulo de usuarios
    ├── layout.tsx        # Layout para rutas /users/*
    ├── page.tsx          # Lista de usuarios (/users)
    └── [...profile]/     # Rutas dinámicas (/users/123, /users/123/edit)
        ├── layout.tsx    # Layout para perfiles
        └── page.tsx      # Página de perfil dinámico
```

**💡 Convención de rutas:**
- `page.tsx` = Página accesible públicamente
- `layout.tsx` = Layout compartido para un grupo de rutas
- `[...slug]` = Rutas dinámicas catch-all

---

#### 🧩 **`/src/components/` - Componentes UI**

```
components/
├── index.ts              # Exportaciones centralizadas
├── shared/               # Componentes reutilizables globalmente
│   ├── Header.tsx        # Navegación principal
│   ├── Footer.tsx        # Pie de página
│   └── index.ts          # Barrel exports
├── home/                 # Componentes específicos del home
│   ├── FeatureCard.tsx   # Tarjeta de características
│   ├── HeroSection.tsx   # Sección hero principal
│   ├── StatsCard.tsx     # Tarjeta de estadísticas
│   ├── TeamPreview.tsx   # Vista previa del equipo
│   ├── SectionContainer.tsx # Contenedor de secciones
│   └── index.ts          # Exportaciones del módulo
└── users/                # Componentes específicos de usuarios
    ├── UserCard.tsx      # Tarjeta de usuario
    ├── UserForm.tsx      # Formulario de usuario
    ├── UserProfile.tsx   # Perfil de usuario
    └── index.ts          # Exportaciones del módulo
```

**🎯 Principios de Componentes:**
- **Reutilización:** Los componentes `shared/` son usables en cualquier parte
- **Especialización:** Componentes por módulo (`home/`, `users/`)
- **Barrel Exports:** Cada directorio tiene un `index.ts` para importaciones limpias

---

#### 🏢 **`/src/modules/` - Lógica de Negocio**

```
modules/
├── home/
│   ├── index.ts          # Exportaciones del módulo home
│   └── types/
│       └── index.ts      # Tipos específicos del home
└── users/
    ├── index.ts          # Exportaciones del módulo users
    ├── services/
    │   ├── usersService.ts # API calls y lógica de negocio
    │   └── index.ts
    └── types/
        └── index.ts      # Tipos del módulo users
```

**📋 Estructura del Service (ejemplo `usersService.ts`):**
```typescript
// ✅ Funciones CRUD completas
- getAllUsers()      // GET /api/users
- getUserById(id)    // GET /api/users/:id  
- createUser(data)   // POST /api/users
- updateUser(data)   // PUT /api/users/:id
- deleteUser(id)     // DELETE /api/users/:id
- filterUsers()      // Filtrado local

// ✅ Características avanzadas
- Manejo de errores con ApiError
- Transformación de datos Frontend ↔ Backend
- Proxy integrado para evitar CORS
- Logging de requests
- Tipado completo con TypeScript
```

---

#### 🔧 **`/src/lib/` - Utilidades**
```
lib/
└── utils.ts              # Funciones helper y utilidades
```

#### 📝 **`/src/types/` - Tipos Globales**
```
types/
└── api.ts                # Interfaces y tipos del backend
```

---

## ⚙️ **Configuraciones Clave**

### 🔧 **Next.js Config (`next.config.ts`)**
```typescript
// ✅ Proxy para Backend (evita CORS)
rewrites: [
  {
    source: '/api/users/:path*',
    destination: 'http://localhost:3001/users/:path*'
  }
]

// ✅ Optimización de imágenes externas
images: {
  remotePatterns: [
    { hostname: 'images.unsplash.com' },
    { hostname: 'ui-avatars.com' }
  ]
}
```

### 📦 **TypeScript Config (`tsconfig.json`)**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "paths": {
      "app/*": ["./src/*"]  // ✅ Path mapping
    }
  }
}
```

---

## 🚀 **Cómo Extender esta Estructura**

### ➕ **Agregar un Nuevo Módulo**

**1. Crear la estructura del módulo:**
```bash
mkdir -p src/modules/nuevo-modulo/{services,types}
mkdir -p src/components/nuevo-modulo
mkdir -p src/app/nuevo-modulo
```

**2. Implementar el service:**
```typescript
// src/modules/nuevo-modulo/services/nuevoModuloService.ts
export async function getAllItems() { /* ... */ }
export async function createItem(data: CreateItemRequest) { /* ... */ }
// Seguir patrón de usersService.ts
```

**3. Definir tipos:**
```typescript
// src/modules/nuevo-modulo/types/index.ts
export interface Item {
  id: number;
  name: string;
  // ... más propiedades
}

export interface CreateItemRequest { /* ... */ }
```

**4. Crear componentes:**
```typescript
// src/components/nuevo-modulo/ItemCard.tsx
// src/components/nuevo-modulo/ItemForm.tsx
// src/components/nuevo-modulo/index.ts (barrel exports)
```

**5. Agregar ruta en App Router:**
```typescript
// src/app/nuevo-modulo/page.tsx
// src/app/nuevo-modulo/layout.tsx
```

---

## 📚 **Información para el Equipo**

### Tipos Disponibles
Los tipos TypeScript del backend están disponibles en `src/types/api.ts`:
- `User`, `Profile`, `Exercise`, `WeeklyRoutine`
- Enums: `Goal`, `ActivityLevel`, `DayOfWeek`
- DTOs para requests: `CreateUserDto`, `UpdateUserDto`, etc.

### API Base URL
```
http://localhost:3001
```

### Ejemplo de Uso con Fetch (usando proxy)
```typescript
// Usando el proxy configurado (recomendado)
const response = await fetch('/api/users/1/routines');
const routines = await response.json();

// O directamente al backend
const response = await fetch('http://localhost:3001/users/1/routines');
const routines = await response.json();
```

### Servicios Disponibles (Funciones Guía)
- **usersService.ts** - `getAllUsers()` implementado como guía
- **exercisesService.ts** - `getAllExercises()` implementado como guía  
- **routinesService.ts** - `getAllRoutines()` implementado como guía
- **profilesService.ts** - `getProfileByUserId()` implementado como guía
- Manejo de errores con `ApiError` incluido
- Funciones comentadas para implementar por los estudiantes
- Tipado completo con TypeScript

## 🚀 **Comandos Útiles**

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## 🔗 **Enlaces Relacionados**

- **Backend:** `../fitness-app-backend/`
- **API Docs:** `../fitness-app-backend/API_DOCUMENTATION.md`
- **Base de Datos:** SQLite con datos de prueba incluidos

---

## 🎓 **Guía para Estudiantes**

### ✅ **Funciones Guía Implementadas**
- **usersService.ts** - `getAllUsers()` como ejemplo funcional completo

### 🔄 **Funciones para Implementar (Comentadas)**
Cada servicio tiene las siguientes funciones comentadas para implementar:

**Users Service:**
- ✅ `getAllUsers(): Promise<User[]>` - **IMPLEMENTADA COMO GUÍA**
- `getUserById(id: number): Promise<User>`
- `createUser(data: CreateUserDto): Promise<User>`
- `updateUser(id: number, data: UpdateUserDto): Promise<User>`
- `deleteUser(id: number): Promise<void>`
- `getUserRoutines(id: number): Promise<WeeklyRoutine[]>`
- `filterUsers(users: User[], filters: UserFilters): User[]`
- `transformUserForDisplay(user: User): UserWithStats`

**Exercises Service:**
- `getAllExercises(): Promise<Exercise[]>`
- `getExerciseById(id: number): Promise<Exercise>`
- `createExercise(data: CreateExerciseDto): Promise<Exercise>`
- `updateExercise(id: number, data: UpdateExerciseDto): Promise<Exercise>`
- `deleteExercise(id: number): Promise<void>`
- `filterExercises(exercises: Exercise[], searchTerm: string): Exercise[]`
- `groupExercisesByCategory(exercises: Exercise[]): Record<string, Exercise[]>`

**Routines Service:**
- `getAllRoutines(filters?: { dayOfWeek?: string; completed?: boolean; userId?: number }): Promise<WeeklyRoutine[]>`
- `getRoutineById(id: number): Promise<WeeklyRoutine>`
- `createRoutine(data: CreateRoutineDto): Promise<WeeklyRoutine>`
- `updateRoutine(id: number, data: UpdateRoutineDto): Promise<WeeklyRoutine>`
- `deleteRoutine(id: number): Promise<void>`
- `completeRoutine(id: number, completed: boolean): Promise<WeeklyRoutine>`
- `addExerciseToRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine>`
- `removeExerciseFromRoutine(routineId: number, exerciseId: number): Promise<WeeklyRoutine>`
- `getRoutinesByDay(routines: WeeklyRoutine[], dayOfWeek: string): WeeklyRoutine[]`
- `getCompletedRoutines(routines: WeeklyRoutine[]): WeeklyRoutine[]`
- `getPendingRoutines(routines: WeeklyRoutine[]): WeeklyRoutine[]`
- `calculateRoutineProgress(routines: WeeklyRoutine[]): { completed: number; total: number; percentage: number }`

**Profiles Service:**
- `getProfileByUserId(userId: number): Promise<Profile>`
- `updateProfile(userId: number, data: UpdateProfileDto): Promise<Profile>`
- `getGoalDescription(goal: string): string`
- `getActivityLevelDescription(activityLevel: string): string`
- `calculateCalorieNeeds(weight: number, height: number, age: number, activityLevel: string, goal: string): number`

### 💡 **Patrón de Implementación**
Cada función debe seguir el patrón de `getAll`:
```typescript
export async function functionName(params): Promise<ReturnType> {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoint`, {
      method: 'METHOD',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // si aplica
    });
    if (!response.ok) {
      throw new ApiError(response.status, 'Error message');
    }
    return response.json();
  } catch (error) {
    console.error('Error en functionName:', error);
    throw error;
  }
}
```

### 🎯 **Tareas para los Estudiantes**
1. **Implementar funciones CRUD** en los servicios (siguiendo el patrón de `getAll`)
2. **Implementar componentes UI** específicos (reemplazar placeholders)
3. **Crear páginas adicionales** según necesidades
4. **Integrar servicios** con componentes
5. **Añadir manejo de estado** global si es necesario

---

## 👥 **División de Trabajo por Grupos**

### 📊 **Distribución de Estudiantes:**
- **Total:** 27 estudiantes
- **Grupos:** 6 grupos de 4 estudiantes + 1 grupo de 3 estudiantes
- **Total grupos:** 7 grupos

### 🎯 **Asignación de Endpoints por Grupo:**

**Total de endpoints: 21**  
**División: 3 endpoints por grupo**

#### **Grupo 1 - Users Básico**
- **Endpoints:**
  - `POST /users` - Crear usuario
  - `GET /users` - Listar usuarios  
  - `GET /users/:id` - Obtener usuario
- **Servicios Backend:**
  - `createUser(data: CreateUserDto): Promise<User>`
  - `getAllUsers(): Promise<User[]>`
  - `getUserById(id: number): Promise<User>`
- **Componentes Visuales:**
  - `UserCard.tsx` - Tarjeta de usuario
  - `UserForm.tsx` - Formulario de usuario
  - `UserList.tsx` - Lista de usuarios
- **Páginas:**
  - `/users` - Lista de usuarios
  - `/users/create` - Crear usuario
  - `/users/[id]` - Detalle de usuario

#### **Grupo 2 - Users Avanzado**
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

#### **Grupo 3 - Profiles**
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

#### **Grupo 4 - Exercises Básico**
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

#### **Grupo 5 - Exercises Avanzado + Routines Básico**
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

#### **Grupo 6 - Routines Avanzado**
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

#### **Grupo 7 - Routines Especiales**
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

### 🎯 **Criterios de Evaluación por Grupo:**

#### **TODOS LOS GRUPOS (1-7):**
- ✅ Implementación completa de servicios backend
- ✅ Implementación completa de componentes visuales
- ✅ Páginas con navegación correcta
- ✅ Manejo de errores y estados de carga
- ✅ Validaciones de formularios
- ✅ Responsive design
- ✅ Integración correcta entre backend y frontend
- ✅ Tipado completo con TypeScript
- ✅ Uso correcto del proxy `/api`

### 📋 **Entregables por Grupo:**

1. **Código funcional** del módulo asignado
2. **Componentes** con diseño atractivo
3. **Páginas** con navegación correcta
4. **Documentación** del módulo
5. **Presentación** del trabajo realizado

### 🔄 **Coordinación entre Grupos:**

#### **Coordinación General:**
- **Todos los grupos** pueden trabajar independientemente en sus módulos
- **Cada grupo** tiene responsabilidad completa de su módulo (Backend + Frontend)
- **No hay dependencias críticas** entre grupos

#### **Integración Final:**
- Al final del proyecto, todos los grupos deben coordinar para:
  - Integrar sus módulos en la aplicación principal
  - Asegurar consistencia visual
  - Verificar que todas las rutas funcionen correctamente

---

*Semilla creada el 9 de octubre de 2025*