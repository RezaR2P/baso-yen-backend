import CategoriesModel from '../models/categories.js';
import slugify from 'slugify';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.getAll();
    res.json({
      success: true,
      message: 'Categories berhasil di ambil',
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategoriesModel.getById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category tidak di temukan',
        data: null,
      });
    }

    res.json({
      success: true,
      message: 'Category berhasil diambil',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const category = await CategoriesModel.create(name, slug);
    res.status(201).json({
      success: true,
      message: 'Categories berhasil di buat',
      data: { id: category, slug, ...req.body },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const category = await CategoriesModel.getById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category tidak ditemukan',
        data: null,
      });
    }

    await CategoriesModel.update(name, slug, id);
    res.json({
      success: true,
      message: 'Category Berhasil Di Update',
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

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategoriesModel.getById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category tidak ditemukan',
        data: null,
      });
    }

    await CategoriesModel.delete(id);
    res.json({
      success: true,
      message: 'Category Berhasil di hapus',
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
