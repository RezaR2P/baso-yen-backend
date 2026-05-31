import express from 'express';
import dotenv from 'dotenv';
import db from './src/config/db.js';
import productsRoutes from './src/routes/products.js';
import cateriesRoutes from './src/routes/categories.js';
import recipesRoutes from './src/routes/recipes.js';
import articlesRoutes from './src/routes/articles.js';
import contactsRoutes from './src/routes/contacts.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/categories', cateriesRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/contacts', contactsRoutes);

// app.get('/', async (req, res) => {
//   try {
//     const [rows] = await db.execute('SELECT 1+1  AS result');
//     res.json({
//       message: 'Server Baso Berhasil Berjalan',
//       database: 'Koneksi MYSQL Berhasil!',
//       test: rows[0].result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Koneksi Database gagal',
//       error: error.message,
//     });
//   }
// });

app.listen(PORT, () => {
  console.log(`server berjalan di http://localhost:${PORT}`);
});
