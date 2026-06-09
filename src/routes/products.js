import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductBySlug,
  getAllProductsAdmin,
} from '../controllers/products.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/admin/all', authenticate, getAllProductsAdmin);
router.get('/category/:category_id', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/', authenticate, upload.single('image'), createProduct);
router.put('/:id', authenticate, upload.single('image'), updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
