import ContactsModel from '../models/contacts.js';

export const getAllContact = async (req, res) => {
  try {
    const contacts = await ContactsModel.getAll();
    res.json({
      success: true,
      message: 'Pesan berhasil di ambil',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getByIdContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await ContactsModel.getById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Pesan Tidak ditemukan',
        data: contact,
      });
    }
    res.json({
      success: true,
      message: 'Pesan di temukan',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const createContact = async (req, res) => {
  try {
    const {
      name,
      business_name = null,
      phone,
      email,
      city,
      message,
    } = req.body;
    const contact = await ContactsModel.create(
      name,
      business_name,
      phone,
      email,
      city,
      message
    );
    res.status(201).json({
      success: true,
      message: 'Pesan Berhasil Di buat',
      data: { id: contact, ...req.body },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const updateStatusContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const allowedStatus = ['new', 'read', 'replied'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid, gunakan new, read, atau replied',
        data: null,
      });
    }
    const contact = await ContactsModel.getById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Pesan Tidak ditemukan',
        data: contact,
      });
    }
    await ContactsModel.updateStatus(status, id);
    res.json({
      success: true,
      message: 'Pesan Berhasil Di Update',
      data: { id: Number(id), status },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await ContactsModel.getById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Pesan Tidak Ditemukan',
        data: null,
      });
    }
    await ContactsModel.delete(id);
    res.json({
      success: true,
      message: 'Pesan Berhasil Di hapus',
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
