import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './src/config/db.js';
import productsRoutes from './src/routes/products.js';
import cateriesRoutes from './src/routes/categories.js';
import recipesRoutes from './src/routes/recipes.js';
import articlesRoutes from './src/routes/articles.js';
import contactsRoutes from './src/routes/contacts.js';
import authRoutes from './src/routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/categories', cateriesRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`server berjalan di http://localhost:${PORT}`);
});
