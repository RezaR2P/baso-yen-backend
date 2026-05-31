import { Router } from 'express';
import {
  getAllContact,
  getByIdContact,
  createContact,
  updateStatusContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = Router();

router.get('/', getAllContact);
router.get('/:id', getByIdContact);
router.post('/', createContact);
router.patch('/:id/status', updateStatusContact);
router.delete('/:id', deleteContact);

export default router;
