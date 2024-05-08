const { default: mongoose } = require("mongoose");
const StockRequest = require("./model");
const stockRequestSchema = require("./schema");

// Create a new stock request
async function createStockRequest(req, res) {
  try {
    // Validate the request data against the Joi schema
    const validatedStockRequestData = await stockRequestSchema.validateAsync(
      req.body
    );
    // Create a new StockRequest instance using the validated data
    const newStockRequest = new StockRequest({
      ...validatedStockRequestData,
      creator: req.user._id,
      requestedBy: req.user._id,
    });
    console.log(newStockRequest);

    // Save the new StockRequest instance to the database
    const savedStockRequest = await newStockRequest.save();

    res.status(201).json({
      success: true,
      data: savedStockRequest,
      message: "Stock Request Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message, success: false });
  }
}

// Read all stock requests
async function getAlltockRequests(req, res) {
  try {
    let stockRequests;
    if (req.user.role === "ADMIN") {
      stockRequests = await StockRequest.find()
        .populate("item")
        .populate("department")
        .populate("vendor")
        .populate("requestedBy")
        .populate("item")
        .populate("itemGroup")
        .populate("unitOfMeasurement");
    } else {
      stockRequests = await StockRequest.find({ requestedBy: req.user._id })
        .populate("item")
        .populate("department")
        .populate("vendor")
        .populate("requestedBy")
        .populate("item")
        .populate("itemGroup")
        .populate('unitOfMeasurement')
    }
    return res.json({
      success: true,
      data: stockRequests,
      message: "All Stock Requests",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message, success: false });
  }
}

// Read a single stock request by ID
async function getStockRequestById(req, res) {
  try {
    // Validate the ID parameter
    const validatedId = req.params.id;

    const stockRequest = await StockRequest.findById(validatedId);

    if (!stockRequest) {
      return res
        .status(404)
        .json({ error: `No stock request found with ID ${req.params.id}` });
    }

    res.json(stockRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update a stock request by ID
async function updateStockRequestById(req, res) {
  try {
    // Validate the ID parameter
    const validatedId = new mongoose.Types.ObjectId(req.params.id);

    const request = await StockRequest.findById(validatedId);
    if (!request) throw new Error("Receivable note not found");
    if (request.creator != req.user._id)
      throw new Error("You are not allowed to update this stock request");

    const { error, value } = stockRequestSchema.validate(req.body);
    if (req.user.role != "ADMIN" && value.isApproved != undefined)
      value.isApproved = false;
    if (error)
      return res.status(406).json({ success: false, message: error.message });
    const updatedStockRequest = await StockRequest.findByIdAndUpdate(
      validatedId,
      value,
      { new: true }
    );
    res.json({
      success: true,
      message: "Updated successfully",
      data: updatedStockRequest,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete a stock request by ID
async function deleteStockRequestById(req, res) {
  try {
    // Validate the ID parameter
    const validatedId = new mongoose.Types.ObjectId(req.params.id);
    const request = await StockRequest.findById(validatedId);
    console.log(request, req.user._id);
    if (req.user._id != request.creator)
      throw new Error("You are not allowed to delete this stock request");
    const deletedStockRequest = await StockRequest.findByIdAndDelete(
      validatedId
    );

    if (!deletedStockRequest) {
      return res.status(406).json({
        success: false,
        message: "Not authorized to delete this request",
      });
    }
    return res.json({
      success: true,
      message: "Stock Request Deleted Successfully",
      data: deletedStockRequest,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const approveRequest = async (req, res) => {
  try {
    const request = await StockRequest.findById(req.params.id);
    if (!request)
      return res
        .status(404)
        .json({ success: false, message: "No request found" });
    if (request.isApproved)
      return res
        .status(406)
        .json({ success: false, message: "Request already approved" });
    else {
      console.log(request);
      request.isApproved = true;
      await request.save();
      res.json({ success: true, message: "Request approved", data: request });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createStockRequest,
  getAlltockRequests,
  getStockRequestById,
  updateStockRequestById,
  deleteStockRequestById,
  approveRequest,
};
