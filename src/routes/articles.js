import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getAllArticles,
  getByIdArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleBySlug,
} from '../controllers/articles.js';

const router = Router();

router.get('/', getAllArticles);
router.get('/slug/:slug', getArticleBySlug);
router.get('/:id', getByIdArticle);
router.post('/', authenticate, createArticle);
router.put('/:id', authenticate, updateArticle);
router.delete('/:id', authenticate, deleteArticle);

export default router;
