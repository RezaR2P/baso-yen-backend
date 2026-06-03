import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductBySlug,
} from '../controllers/products.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/category/:category_id', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
