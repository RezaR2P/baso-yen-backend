import ArticlesModel from '../models/articles.js';
import slugify from 'slugify';

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticlesModel.getAll();
    res.json({
      success: true,
      message: 'artikel berhasil di ambil',
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getByIdArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await ArticlesModel.getById(id);
    if (!rows) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan',
        data: null,
      });
    }
    res.json({
      success: true,
      message: 'Artikel Berhasil Di Ambil',
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      thumbnail_url = null,
      author_id = null,
      is_published,
    } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const create = await ArticlesModel.create(
      title,
      slug,
      content,
      thumbnail_url,
      author_id,
      is_published
    );
    res.status(201).json({
      success: true,
      message: 'Artikel Berhasil di buat',
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

export const updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, thumbnail_url = null, is_published } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const article = await ArticlesModel.getById(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan',
        data: null,
      });
    }
    await ArticlesModel.update(
      title,
      slug,
      content,
      thumbnail_url,
      is_published,
      id
    );
    res.json({
      success: true,
      message: 'Artikel Berhasil di Update',
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

export const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await ArticlesModel.getById(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan',
        data: null,
      });
    }
    await ArticlesModel.delete(id);
    res.json({
      success: true,
      message: 'Artikel Berhasil di hapus',
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

export const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await ArticlesModel.getBySlug(slug);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Resep tidak ditemukan',
        data: null,
      });
    }
    res.json({
      success: true,
      message: 'Resep Berhasil Di ambil',
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
