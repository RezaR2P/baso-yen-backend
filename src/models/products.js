import db from '../config/db.js';

const ProductModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },
  create: async (
    name,
    slug,
    category_id,
    description,
    price,
    image_url,
    is_featured,
    is_active
  ) => {
    const [result] = await db.execute(
      'INSERT INTO products (name, slug, category_id, description, price, image_url, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ? ,? ,?)',
      [
        name,
        slug,
        category_id,
        description,
        price,
        image_url,
        is_featured,
        is_active,
      ]
    );
    return result.insertId;
  },
  update: async (
    name,
    slug,
    category_id,
    description,
    price,
    image_url,
    is_featured,
    is_active,
    id
  ) => {
    const [result] = await db.execute(
      'UPDATE products set name=?, slug=?, category_id=?, description=?, price=?, image_url=?, is_featured=?, is_active=? WHERE id=?',
      [
        name,
        slug,
        category_id,
        description,
        price,
        image_url,
        is_featured,
        is_active,
        id,
      ]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM products WHERE id = ? ', [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default ProductModel;
