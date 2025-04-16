import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DB_PATH || '../dua_main.sqlite';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(DB_PATH, (err: Error | null) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log(`Connected to the SQLite database at ${DB_PATH}`);
  }
});

// Types for our data
interface Category {
  id: number;
  cat_name_en: string;
  cat_name_bn: string;
  cat_icon: string;
  no_of_subcat: number;
  no_of_dua: number;
}

interface SubCategory {
  id: number;
  cat_id: number;
  subcat_name_en: string;
  subcat_name_bn: string;
  no_of_dua: number;
}

interface Dua {
  id: number;
  cat_id: number;
  subcat_id: number;
  dua_name_en: string;
  dua_name_bn: string;
  top_en: string;
  top_bn: string;
  dua_arabic: string;
  dua_indopak: string;
  clean_arabic: string;
  transliteration_en: string;
  transliteration_bn: string;
  translation_en: string;
  translation_bn: string;
  bottom_en: string;
  bottom_bn: string;
  refference_en: string;
  refference_bn: string;
  audio: string;
}

// Helper function to run queries
function runQuery<T>(query: string, params: unknown[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err: Error | null, rows: T[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Get database structure
app.get('/api/db-info', async (req: Request, res: Response) => {
  try {
    const tables = await runQuery<{name: string}>("SELECT name FROM sqlite_master WHERE type='table'");
    res.json({ tables });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get all categories
app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    const categories = await runQuery<Category>("SELECT * FROM category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get subcategories by category ID
app.get('/api/categories/:categoryId/subcategories', async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await runQuery<SubCategory>(
      "SELECT * FROM sub_category WHERE cat_id = ?", 
      [categoryId]
    );
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get duas by category ID
app.get('/api/categories/:categoryId/duas', async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const duas = await runQuery<Dua>(
      "SELECT * FROM dua WHERE cat_id = ?", 
      [categoryId]
    );
    res.json(duas);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get duas by both category ID and subcategory ID
app.get('/api/categories/:categoryId/subcategories/:subCategoryId/duas', async (req: Request, res: Response) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const duas = await runQuery<Dua>(
      "SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?", 
      [categoryId, subCategoryId]
    );
    res.json(duas);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get duas by subcategory ID
app.get('/api/subcategories/:subCategoryId/duas', async (req: Request, res: Response) => {
  try {
    const { subCategoryId } = req.params;
    const duas = await runQuery<Dua>(
      "SELECT * FROM dua WHERE subcat_id = ?", 
      [subCategoryId]
    );
    res.json(duas);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get dua details by ID
app.get('/api/duas/:duaId', async (req: Request, res: Response) => {
  try {
    const { duaId } = req.params;
    const dua = await runQuery<Dua>(
      "SELECT * FROM dua WHERE id = ?", 
      [duaId]
    );
    
    if (dua.length === 0) {
      return res.status(404).json({ error: "Dua not found" });
    }
    
    res.json(dua[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get category icons information
app.get('/api/category-icons', async (req: Request, res: Response) => {
  try {
    const categories = await runQuery<Category>("SELECT id, cat_name_en, cat_icon FROM category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get a specific category icon by ID
app.get('/api/categories/:categoryId/icon', async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const category = await runQuery<Category>(
      "SELECT id, cat_name_en, cat_icon FROM category WHERE id = ?", 
      [categoryId]
    );
    
    if (category.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    res.json({ icon: category[0].cat_icon });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Close database connection on app termination
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
}); 