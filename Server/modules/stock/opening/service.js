const OpeningStock = require('./model');
const Joi = require('joi');
const openingStockSchema = require('./schema');

// Create a new opening stock record
exports.createOpenStock = async (req, res) => {
  try {
    const { error } = openingStockSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const openingStock = new OpeningStock({
      ...req.body,
      creator: req.user._id,
    });
    await openingStock.save();
    res.status(201).json({ success: true, message: 'Created', data: openingStock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all opening stock records
exports.getAllOpenStocks = async (req, res) => {
  try {
    const openingStocks = await OpeningStock.find().populate('item').populate('creator');
    res.json({ success: true, message: 'Created', data: openingStocks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single opening stock record by id
exports.getOpenStockById = async (req, res) => {
  try {
    const openingStock = await OpeningStock.findById(req.params.id).populate('item').populate('creator');
    if (!openingStock) {
      return res.status(404).json({ error: 'Opening stock not found' });
    }
    res.json({ success: true, message: 'Created', data: openingStock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a single opening stock record by id
exports.updateOpenStockById = async (req, res) => {
  try {
    const { error } = openingStockSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const openingStock = await OpeningStock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!openingStock) {
      return res.status(404).json({ error: 'Opening stock not found' });
    }
    res.json({ success: true, message: 'Created', data: openingStock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a single opening stock record by id
exports.deleteOpenStockById = async (req, res) => {
  try {
    const openingStock = await OpeningStock.findByIdAndDelete(req.params.id);
    if (!openingStock) {
      return res.status(404).json({ error: 'Opening stock not found' });
    }
    res.json({ sucess: true, message: 'Opening stock deleted', data: openingStock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
