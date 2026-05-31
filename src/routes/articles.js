import { Router } from 'express';
import {
  getAllArticles,
  getByIdArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articles.js';

const router = Router();

router.get('/', getAllArticles);
router.get('/:id', getByIdArticle);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
