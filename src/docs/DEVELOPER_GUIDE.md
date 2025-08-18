# VetKonnect Developer Guide

Welcome to the VetKonnect codebase! This guide will help you understand the project structure, conventions, and best practices for developing features in this Next.js 13 veterinary practice management system.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Making API Calls](#making-api-calls)
4. [Creating UI Components](#creating-ui-components)
5. [Page Structure](#page-structure)
6. [State Management](#state-management)
7. [Assets Management](#assets-management)
8. [TypeScript Types](#typescript-types)
9. [Styling with Tailwind CSS](#styling-with-tailwind-css)
10. [Best Practices](#best-practices)

## Project Overview

VetKonnect is built with:
- **Next.js 13** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Zustand** for state management
- **TanStack Query** for data fetching
- **Framer Motion** for animations

## Project Structure

```
src/
├── app/                    # Next.js 13 App Router pages
│   ├── auth/              # Authentication pages (login, signup, etc.)
│   ├── root/              # Protected pages (dashboard, etc.)
│   ├── assets/            # Static assets
│   │   ├── images/        # Image files
│   │   └── icons/         # Icon files
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── shared/           # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature-specific components
├── lib/                   # Utility functions and configurations
│   ├── api.ts            # API client configuration
│   ├── api-constants.ts  # API endpoint constants
│   ├── hooks.ts          # Custom React hooks
│   └── utils.ts          # Utility functions
├── services/             # API service functions
├── store/                # Zustand store definitions
├── types/                # TypeScript type definitions
└── ...
```

## Making API Calls

### 1. Define API Endpoints

All API URLs must be defined in `src/lib/api-constants.ts` before use:

```typescript
// src/lib/api-constants.ts
export const VETERINARY_ENDPOINTS = {
  GET_ANIMALS: '/animals',
  CREATE_ANIMAL: '/animals',
  UPDATE_ANIMAL: (id: string) => `/animals/${id}`,
  DELETE_ANIMAL: (id: string) => `/animals/${id}`,
} as const;
```

### 2. Create Service Functions

Create dedicated service functions in `src/services/` for related API calls:

```typescript
// src/services/animalService.ts
import { VETERINARY_ENDPOINTS } from '@/lib/api-constants';
import { useGet, usePost, usePut, useDelete } from '@/lib/hooks';
import { Animal, CreateAnimalRequest } from '@/types';

// GET request
export const useGetAnimals = () => {
  return useGet<Animal[]>(['animals'], VETERINARY_ENDPOINTS.GET_ANIMALS);
};

// POST request
export const useCreateAnimal = () => {
  return usePost<Animal, CreateAnimalRequest>(
    VETERINARY_ENDPOINTS.CREATE_ANIMAL,
    {
      onSuccess: (data) => {
        console.log('Animal created:', data);
      },
      onError: (error) => {
        console.error('Failed to create animal:', error);
      },
      invalidateQueries: [['animals']], // Refresh animals list
    }
  );
};

// PUT request
export const useUpdateAnimal = (id: string) => {
  return usePut<Animal, Partial<Animal>>(
    VETERINARY_ENDPOINTS.UPDATE_ANIMAL(id),
    {
      invalidateQueries: [['animals'], ['animal', id]],
    }
  );
};

// DELETE request
export const useDeleteAnimal = (id: string) => {
  return useDelete(
    VETERINARY_ENDPOINTS.DELETE_ANIMAL(id),
    {
      invalidateQueries: [['animals']],
    }
  );
};
```

### 3. Using API Hooks in Components

```typescript
// In your component
import { useGetAnimals, useCreateAnimal } from '@/services/animalService';

export default function AnimalsList() {
  const { data: animals, isLoading, error } = useGetAnimals();
  const createAnimalMutation = useCreateAnimal();

  const handleCreateAnimal = (animalData: CreateAnimalRequest) => {
    createAnimalMutation.mutate(animalData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {animals?.map(animal => (
        <div key={animal.id}>{animal.name}</div>
      ))}
    </div>
  );
}
```

## Creating UI Components

### 1. Using shadcn/ui Components

Install and use shadcn/ui components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

```typescript
// Using shadcn components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function MyComponent() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Animal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Animal name" />
          <Button>Save Animal</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 2. Component Organization

- **Shared Components**: Place reusable components in `src/components/shared/`
- **Feature Components**: Create feature-specific folders in `src/components/`
- **UI Components**: shadcn/ui components go in `src/components/ui/`

```typescript
// src/components/shared/LoadingSpinner.tsx
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-green-500 border-t-transparent ${sizeClasses[size]}`} />
  );
}
```

## Page Structure

### 1. Main Pages (src/app/root/)

All main application pages go in `src/app/root/`:

```typescript
// src/app/root/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

### 2. Authentication Pages (src/app/auth/)

All authentication-related pages go in `src/app/auth/`:

```typescript
// src/app/auth/login/page.tsx
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        {/* Login form */}
      </div>
    </div>
  );
}
```

### 3. Page Layout Structure

```typescript
// Typical page structure
export default function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Page Title</h1>
        <p className="text-gray-600 mt-2">Page description</p>
      </div>

      {/* Page Content */}
      <div className="space-y-6">
        {/* Content sections */}
      </div>
    </div>
  );
}
```

## State Management

### 1. Zustand Store Structure

Create stores in `src/store/`:

```typescript
// src/store/animalStore.ts
import { create } from 'zustand';
import { Animal } from '@/types';

interface AnimalStore {
  selectedAnimal: Animal | null;
  filters: {
    species: string;
    status: string;
  };
  setSelectedAnimal: (animal: Animal | null) => void;
  setFilters: (filters: Partial<AnimalStore['filters']>) => void;
  clearFilters: () => void;
}

export const useAnimalStore = create<AnimalStore>((set) => ({
  selectedAnimal: null,
  filters: {
    species: '',
    status: '',
  },
  setSelectedAnimal: (animal) => set({ selectedAnimal: animal }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  clearFilters: () =>
    set({
      filters: {
        species: '',
        status: '',
      },
    }),
}));
```

### 2. Using Zustand with TanStack Query

```typescript
// In your component
import { useAnimalStore } from '@/store/animalStore';
import { useGetAnimals } from '@/services/animalService';

export default function AnimalsList() {
  const { filters, setFilters, selectedAnimal, setSelectedAnimal } = useAnimalStore();
  
  // TanStack Query automatically handles caching, background updates, etc.
  const { data: animals, isLoading } = useGetAnimals();

  // Filter animals based on Zustand store state
  const filteredAnimals = animals?.filter(animal => {
    if (filters.species && animal.species !== filters.species) return false;
    if (filters.status && animal.status !== filters.status) return false;
    return true;
  });

  return (
    <div>
      {/* Filter controls update Zustand store */}
      <select onChange={(e) => setFilters({ species: e.target.value })}>
        <option value="">All Species</option>
        <option value="dog">Dogs</option>
        <option value="cat">Cats</option>
      </select>

      {/* Render filtered animals */}
      {filteredAnimals?.map(animal => (
        <div 
          key={animal.id}
          onClick={() => setSelectedAnimal(animal)}
          className={selectedAnimal?.id === animal.id ? 'bg-blue-100' : ''}
        >
          {animal.name}
        </div>
      ))}
    </div>
  );
}
```

### 3. How Zustand + TanStack Query Work Together

- **TanStack Query**: Handles server state (API data, caching, background updates)
- **Zustand**: Handles client state (UI state, user preferences, temporary data)

```typescript
// Example: Search functionality
const useSearchStore = create<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

// In component
const { searchTerm, setSearchTerm } = useSearchStore();
const { data: animals } = useGetAnimals({
  enabled: searchTerm.length > 2, // Only search when term is long enough
});
```

## Assets Management

### 1. Images

Place images in `src/app/assets/images/` and export them:

```typescript
// src/app/assets/images/index.ts
export { default as VetKonnectLogo } from './vetkonectLogo.svg';
export { default as HeroImage } from './hero-image.jpg';
export { default as DefaultAvatar } from './default-avatar.png';
```

Usage:
```typescript
import { VetKonnectLogo, HeroImage } from '@/app/assets/images';
import Image from 'next/image';

export function Header() {
  return (
    <div>
      <Image src={VetKonnectLogo} alt="VetKonnect Logo" width={120} height={40} />
      <Image src={HeroImage} alt="Hero" width={800} height={600} />
    </div>
  );
}
```

### 2. Icons

Place icons in `src/app/assets/icons/` and export them:

```typescript
// src/app/assets/icons/index.ts
export { default as PlusIcon } from './plus.svg';
export { default as EditIcon } from './edit.svg';
export { default as DeleteIcon } from './delete.svg';
```

Usage:
```typescript
import { PlusIcon, EditIcon } from '@/app/assets/icons';
import Image from 'next/image';

export function ActionButtons() {
  return (
    <div className="flex space-x-2">
      <button className="p-2">
        <Image src={PlusIcon} alt="Add" width={16} height={16} />
      </button>
      <button className="p-2">
        <Image src={EditIcon} alt="Edit" width={16} height={16} />
      </button>
    </div>
  );
}
```

### 3. Main Assets Index

Export everything from the main assets index:

```typescript
// src/app/assets/index.ts
export * from './images';
export * from './icons';
```

## TypeScript Types

### 1. Type Organization

Create separate files for different domains in `src/types/`:

```typescript
// src/types/animal.ts
export interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'other';
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  status: 'healthy' | 'sick' | 'recovering';
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnimalRequest {
  name: string;
  species: Animal['species'];
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
}

export interface UpdateAnimalRequest extends Partial<CreateAnimalRequest> {
  id: string;
}
```

```typescript
// src/types/user.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'veterinarian' | 'assistant';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: User['role'];
}
```

### 2. Main Types Index

Export all types from the main index:

```typescript
// src/types/index.ts
export * from './animal';
export * from './user';
export * from './appointment';
export * from './api';

// Common utility types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

## Styling with Tailwind CSS

### 1. Custom Colors

Define custom colors in `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        // Custom colors for specific use cases
        'light-green': '#E9F6B2',
        'gradient-start': '#B2F6B9',
        'gradient-middle': '#FFE1A6',
        'gradient-end': '#E9F6B2',
      },
    },
  },
};
```

### 2. Using Custom Colors

```typescript
export function CustomButton() {
  return (
    <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
      Click me
    </button>
  );
}

export function GradientHeader() {
  return (
    <div 
      className="h-32 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end"
    >
      <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
    </div>
  );
}
```

## Best Practices

### 1. File Naming

- Use **kebab-case** for files: `animal-list.tsx`, `user-profile.tsx`
- Use **PascalCase** for components: `AnimalList`, `UserProfile`
- Use **camelCase** for functions and variables: `handleSubmit`, `userData`

### 2. Component Structure

```typescript
// Good component structure
interface Props {
  animals: Animal[];
  onAnimalSelect: (animal: Animal) => void;
}

export function AnimalList({ animals, onAnimalSelect }: Props) {
  // Hooks at the top
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuthStore();
  
  // Derived state
  const filteredAnimals = useMemo(() => 
    animals.filter(animal => 
      animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [animals, searchTerm]
  );
  
  // Event handlers
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);
  
  // Early returns
  if (!animals.length) {
    return <div>No animals found</div>;
  }
  
  // Main render
  return (
    <div className="space-y-4">
      <SearchInput onSearch={handleSearch} />
      {filteredAnimals.map(animal => (
        <AnimalCard 
          key={animal.id} 
          animal={animal} 
          onClick={() => onAnimalSelect(animal)} 
        />
      ))}
    </div>
  );
}
```

### 3. Error Handling

```typescript
// API error handling
export function useCreateAnimal() {
  return usePost<Animal, CreateAnimalRequest>(
    VETERINARY_ENDPOINTS.CREATE_ANIMAL,
    {
      onSuccess: (data) => {
        toast.success('Animal created successfully!');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to create animal');
        console.error('Create animal error:', error);
      },
    }
  );
}

// Component error boundaries
export function AnimalListWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <AnimalList />
    </ErrorBoundary>
  );
}
```

### 4. Performance Optimization

```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return animals.reduce((acc, animal) => acc + animal.weight, 0);
}, [animals]);

// Memoize callbacks to prevent unnecessary re-renders
const handleAnimalClick = useCallback((animal: Animal) => {
  setSelectedAnimal(animal);
}, [setSelectedAnimal]);

// Use React.memo for components that don't need frequent updates
export const AnimalCard = React.memo(({ animal, onClick }: Props) => {
  return (
    <div onClick={() => onClick(animal)}>
      {animal.name}
    </div>
  );
});
```

---

## Getting Started Checklist

When starting a new feature:

1. ✅ Define API endpoints in `src/lib/api-constants.ts`
2. ✅ Create TypeScript interfaces in `src/types/`
3. ✅ Create service functions in `src/services/`
4. ✅ Set up Zustand store if needed in `src/store/`
5. ✅ Create reusable components in `src/components/shared/`
6. ✅ Create pages in appropriate folders (`src/app/root/` or `src/app/auth/`)
7. ✅ Add custom colors to `tailwind.config.js` if needed
8. ✅ Export assets from appropriate index files

This guide should help you maintain consistency and follow best practices while developing VetKonnect. Happy coding! 🚀
