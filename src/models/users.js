import db from '../config/db.js';

const UsersModel = {
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email =?', [
      email,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  create: async (name, email, password_hash, role) => {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)',
      [name, email, password_hash, role]
    );
    return result.insertId;
  },
};

export default UsersModel;
