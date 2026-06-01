import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getAllContact,
  getByIdContact,
  createContact,
  updateStatusContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = Router();

router.get('/', authenticate, getAllContact);
router.get('/:id', authenticate, getByIdContact);
router.post('/', createContact);
router.patch('/:id/status', authenticate, updateStatusContact);
router.delete('/:id', authenticate, deleteContact);

export default router;
