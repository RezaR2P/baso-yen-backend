import ProductModel from '../models/products.js';
import slugify from 'slugify';

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.json({
      success: true,
      message: 'Product berhasil di ambil',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await ProductModel.getById(id);

    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Product tidak ditemukan',
        data: null,
      });
    }

    res.json({
      success: true,
      message: 'Product Berhasil Di ambil',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const products = await ProductModel.getByCategory(category_id);
    res.json({
      success: true,
      message: 'Product Berhasil Di ambil',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category_id, description, price, is_featured, is_active } =
      req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await ProductModel.create(
      name,
      slug,
      category_id,
      description,
      price,
      image_url,
      is_featured,
      is_active
    );
    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: { id: product, slug, ...req.body },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, category_id, description, price, is_featured, is_active } =
      req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const product = await ProductModel.getById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product tidak ditemukan',
        data: null,
      });
    }

    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : product.image_url;

    await ProductModel.update(
      name,
      slug,
      category_id,
      description,
      price,
      image_url,
      is_featured,
      is_active,
      id
    );

    res.json({
      success: true,
      message: 'Product berhasil di update',
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

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.getById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product tidak ditemukan',
        data: null,
      });
    }

    await ProductModel.delete(id);
    res.json({
      success: true,
      message: 'Product berhasil di hapus',
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

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const products = await ProductModel.getBySlug(slug);
    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Product tidak ditemukan',
        data: null,
      });
    }
    res.json({
      success: true,
      message: 'Product Berhasil Di ambil',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await ProductModel.getAllAdmin();
    res.json({
      success: true,
      message: 'Data berhasil diambil',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
