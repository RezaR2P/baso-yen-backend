import { Router } from 'express';
import {
  getAllRecipes,
  getByIdRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipes.js';
const router = Router();

router.get('/', getAllRecipes);
router.get('/:id', getByIdRecipe);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
