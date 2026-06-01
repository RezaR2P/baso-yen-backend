import bcrypt from 'bcryptjs';
import UsersModel from '../models/users.js';

const createAdmin = async () => {
  try {
    const hash = await bcrypt.hash('admin1234', 10);
    const result = await UsersModel.create(
      'admin',
      'admin@basoyen.com',
      hash,
      'admin'
    );
    console.log('Admin Berhasil di buat, id:', result);
  } catch (error) {
    console.error(error.message);
  }
};
createAdmin();
