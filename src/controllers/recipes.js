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
    const {
      title,
      ingredients,
      steps,
      image_url = null,
      is_published,
    } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
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
    const {
      title,
      ingredients,
      steps,
      image_url = null,
      is_published,
    } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

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
