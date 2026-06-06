import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getAllRecipes,
  getByIdRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesBySlug,
  getAllRecipesAdmin,
} from '../controllers/recipes.js';
const router = Router();

router.get('/', getAllRecipes);
router.get('/admin/all', authenticate, getAllRecipesAdmin);
router.get('/slug/:slug', getRecipesBySlug);
router.get('/:id', getByIdRecipe);
router.post('/', authenticate, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;
