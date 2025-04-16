# Dua Ruqyah Backend

This is the TypeScript backend for the Dua Ruqyah application using SQLite database.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Make sure the SQLite database file (`dua_main.sqlite`) is in the project root directory.

3. Build the TypeScript code:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

The backend provides the following endpoints:

- `GET /api/db-info` - Get all tables in the database
- `GET /api/categories` - Get all Dua categories
- `GET /api/categories/:categoryId/subcategories` - Get subcategories for a specific category
- `GET /api/subcategories/:subCategoryId/duas` - Get duas for a specific subcategory
- `GET /api/duas/:duaId` - Get details for a specific dua

## Integrating with Next.js Frontend

### Example API Client

Create a file called `api.ts` in your frontend project:

```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function fetchSubcategories(categoryId: number) {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
  if (!response.ok) throw new Error('Failed to fetch subcategories');
  return response.json();
}

export async function fetchDuas(subcategoryId: number) {
  const response = await fetch(`${API_BASE_URL}/subcategories/${subcategoryId}/duas`);
  if (!response.ok) throw new Error('Failed to fetch duas');
  return response.json();
}

export async function fetchDua(duaId: number) {
  const response = await fetch(`${API_BASE_URL}/duas/${duaId}`);
  if (!response.ok) throw new Error('Failed to fetch dua details');
  return response.json();
}
```

### Example Usage in Next.js Pages/Components

```typescript
// pages/categories.tsx or app/categories/page.tsx
import { fetchCategories } from '@/lib/api';

export async function getStaticProps() {
  const categories = await fetchCategories();
  
  return {
    props: {
      categories,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

// Or in a React component using SWR or React Query
import useSWR from 'swr';
import { fetchCategories } from '@/lib/api';

function CategoriesPage() {
  const { data, error, isLoading } = useSWR('categories', fetchCategories);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;
  
  return (
    <div>
      <h1>Dua Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(category => (
          <div key={category.id} className="p-4 border rounded">
            <img src={category.cat_icon} alt={category.cat_name_en} />
            <h2>{category.cat_name_en}</h2>
            <p>Subcategories: {category.no_of_subcat}</p>
            <p>Duas: {category.no_of_dua}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Notes on SQLite

SQLite is a file-based database that's perfect for this application because:

1. It's serverless and doesn't require a separate database server
2. The entire database is contained in a single file (`dua_main.sqlite`)
3. It's cross-platform and works on all operating systems
4. It's ACID-compliant and reliable
5. It requires zero configuration

When deploying, make sure the SQLite database file is accessible to your Node.js server and the path in the code is correct. 