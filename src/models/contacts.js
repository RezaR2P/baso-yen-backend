import db from '../config/db.js';

const ContactsModel = {
  getAll: async () => {
    const [rows] = await db.execute(
      'SELECT * FROM contacts ORDER BY created_at ASC'
    );
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM contacts WHERE id = ?', [
      id,
    ]);
    if (rows === 0) {
      return null;
    }
    return rows[0];
  },
  create: async (name, business_name, phone, email, city, message) => {
    const [result] = await db.execute(
      'INSERT INTO contacts (name, business_name, phone, email, city, message) VALUES (?,?,?,?,?,?)',
      [name, business_name, phone, email, city, message]
    );
    return result.insertId;
  },
  updateStatus: async (status, id) => {
    const [result] = await db.execute(
      'UPDATE contacts SET status=? WHERE id=?',
      [status, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM contacts WHERE id = ?', [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

export default ContactsModel;
