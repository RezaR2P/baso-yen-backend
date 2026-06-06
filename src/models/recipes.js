import db from '../config/db.js';

const RecipesModel = {
  getAll: async () => {
    const [rows] = await db.execute(
      'SELECT * FROM recipes WHERE is_published = 1'
    );
    const parsed = rows.map((row) => ({
      ...row,
      ingredients: JSON.parse(row.ingredients),
      steps: JSON.parse(row.steps),
    }));
    return parsed;
  },
  getAllAdmin: async () => {
    const [rows] = await db.execute('SELECT * FROM recipes');
    return rows.map((row) => ({
      ...row,
      ingredients: JSON.parse(row.ingredients),
      steps: JSON.parse(row.steps),
    }));
  },
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM recipes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    return {
      ...rows[0],
      ingredients: JSON.parse(rows[0].ingredients),
      steps: JSON.parse(rows[0].steps),
    };
  },
  create: async (title, slug, ingredients, steps, image_url, is_published) => {
    const ingredientsStr = JSON.stringify(ingredients);
    const stepsStr = JSON.stringify(steps);
    const [result] = await db.execute(
      'INSERT INTO recipes (title, slug, ingredients, steps, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, ingredientsStr, stepsStr, image_url, is_published]
    );
    return result.insertId;
  },
  update: async (
    title,
    slug,
    ingredients,
    steps,
    image_url,
    is_published,
    id
  ) => {
    const ingredientsStr = JSON.stringify(ingredients);
    const stepsStr = JSON.stringify(steps);
    const [result] = await db.execute(
      'UPDATE recipes SET title=?, slug=?, ingredients=?, steps=?, image_url=?, is_published=? WHERE id=?',
      [title, slug, ingredientsStr, stepsStr, image_url, is_published, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM recipes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
  getBySlug: async (slug) => {
    const [rows] = await db.execute('SELECT * FROM recipes WHERE slug = ?', [
      slug,
    ]);
    if (rows.length === 0) return null;

    return {
      ...rows[0],
      // di parse
      ingredients: JSON.parse(rows[0].ingredients),
      steps: JSON.parse(rows[0].steps),
    };
  },
};

export default RecipesModel;
