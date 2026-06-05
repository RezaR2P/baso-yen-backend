import db from '../config/db.js';

const ArticlesModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM articles');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM articles WHERE id = ?', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  create: async (
    title,
    slug,
    content,
    thumbnail_url,
    author_id,
    is_published
  ) => {
    const [result] = await db.execute(
      'INSERT INTO articles (title, slug, content, thumbnail_url, author_id, is_published) VALUES (?,?,?,?,?,?)',
      [title, slug, content, thumbnail_url, author_id, is_published]
    );
    return result.insertId;
  },
  update: async (title, slug, content, thumbnail_url, is_published, id) => {
    const [result] = await db.execute(
      'UPDATE articles SET title=?, slug=?, content=?, thumbnail_url=?, is_published=? WHERE id=?',
      [title, slug, content, thumbnail_url, is_published, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM articles WHERE id=?', [id]);
    return result.affectedRows > 0;
  },
  getBySlug: async (slug) => {
    const [rows] = await db.execute('SELECT * FROM articles WHERE slug = ?', [
      slug,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },
};

export default ArticlesModel;
