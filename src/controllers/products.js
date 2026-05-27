import ProductModel from '../models/products.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.json({
      success: true,
      message: 'data berhasil di ambil',
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
        message: 'Data tidak ditemukan',
        data: null,
      });
    }

    res.json({
      success: true,
      message: 'Data Berhasil Di ambil',
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
    const {
      name,
      slug,
      category_id,
      description,
      price,
      is_featured,
      is_active,
    } = req.body;
    console.log(req.body);
    const image_url = req.body.image_url || null;
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
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
