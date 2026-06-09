import RecipesModel from '../models/recipes.js';
import slugify from 'slugify';

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipesModel.getAll();
    res.json({
      success: true,
      message: 'Resep berhasil di ambil',
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getByIdRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await RecipesModel.getById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Resep Tidak Ditemukan',
        data: null,
      });
    }
    res.json({
      success: true,
      message: 'Resep berhasil di ambil',
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { title, is_published } = req.body;
    const ingredients = JSON.parse(req.body.ingredients);
    const steps = JSON.parse(req.body.steps);
    const slug = slugify(title, { lower: true, strict: true });
    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image_url || null;
    const create = await RecipesModel.create(
      title,
      slug,
      ingredients,
      steps,
      image_url,
      is_published
    );
    res.status(201).json({
      success: true,
      message: 'Resep berhasil di buat',
      data: { id: create, slug, ...req.body },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, is_published } = req.body;
    const ingredients = JSON.parse(req.body.ingredients);
    const steps = JSON.parse(req.body.steps);
    const slug = slugify(title, { lower: true, strict: true });
    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image_url || null;
    const recipe = await RecipesModel.getById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Resep Tidak Ditemukan',
        data: null,
      });
    }
    await RecipesModel.update(
      title,
      slug,
      ingredients,
      steps,
      image_url,
      is_published,
      id
    );
    res.json({
      success: true,
      message: 'Resep berhasil di update',
      data: { id: Number(id), slug, ...req.body },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await RecipesModel.getById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Resep Tidak Ditemukan',
        data: null,
      });
    }
    await RecipesModel.delete(id);
    res.json({
      success: false,
      message: 'Resep berhasil di hapus',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getRecipesBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const recipe = await RecipesModel.getBySlug(slug);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Resep tidak ditemukan',
        data: null,
      });
    }
    res.json({
      success: true,
      message: 'Resep Berhasil Di ambil',
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getAllRecipesAdmin = async (req, res) => {
  try {
    const recipes = await RecipesModel.getAllAdmin();
    res.json({
      success: true,
      message: 'Resep berhasil diambil',
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
