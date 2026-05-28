import db from '../config/db.js';

const CategoriesModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM product_categories');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM product_categories WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  },
  create: async (name, slug) => {
    const [result] = await db.execute(
      'INSERT INTO product_categories (name, slug) VALUES (?, ?)',
      [name, slug]
    );
    return result.insertId;
  },
  update: async (name, slug, id) => {
    const [result] = await db.execute(
      'UPDATE product_categories SET name=?, slug=? WHERE id=?',
      [name, slug, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await db.execute(
      'DELETE FROM product_categories WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },
};

export default CategoriesModel;
