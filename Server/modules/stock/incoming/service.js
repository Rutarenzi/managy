const Joi = require("joi");
const IncomingRequest = require("./model");
const incomingReqSchema = require("./schema");
const { default: mongoose } = require("mongoose");

// GET /incomingRequests - get all incoming requests
const getAllIncomingRequests = async (req, res) => {
  try {
    const incomingRequests = await IncomingRequest.find().populate("item").populate("unitOfMeasurement");
    res.json({
      success: true,
      data: incomingRequests,
      message: "All incoming requests",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
const getIncomingRequestsByCreator = async (req, res) => {
  try {
    const creator = mongoose.Types.ObjectId(req.user._id);

    const incomingRequests = await IncomingRequest.find({creator});
    res.json({
      success: true,
      data: incomingRequests,
      message: "incoming requests found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET /incomingRequests/:id - get a specific incoming request by ID
const getIncomingRequestById = async (req, res) => {
  try {
    const incomingRequest = await IncomingRequest.findById(req.params.id).populate("item").populate("unitOfMeasurement");
    if (!incomingRequest) {
      return res.status(404).json({ message: "Incoming request not found" });
    }
    res.json(incomingRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /incomingRequests - create a new incoming request
const createIncomingRequest = async (req, res) => {
  try {
    const { error, value } = incomingReqSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log(value);
    const incomingRequest = new IncomingRequest({
      ...req.body,
      creator: req.user._id,
    });
    await incomingRequest.save();
    res
      .status(201)
      .json({
        message: "Incoming request created",
        success: true,
        data: incomingRequest,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /incomingRequests/:id - update a specific incoming request by ID
const updateIncomingRequestById = async (req, res) => {
  try {
    const reqId = new mongoose.Types.ObjectId(req.params.id);
    const creator = req.user._id;
    const request = await IncomingRequest.findById(reqId);
    if (!request) {
      return res.status(404).json({ message: "Incoming request not found" });
    }
    if (request.creator != creator) {
      return res.status(401).json({ message: "You can't update this request" });
    }
    const { error, value } = incomingReqSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const incomingRequest = await IncomingRequest.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!incomingRequest) {
      return res.status(404).json({ message: "Incoming request not found" });
    }
    res.json(incomingRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /incomingRequests/:id - delete a specific incoming request by ID
const deleteIncomingRequestById = async (req, res) => {
  try {

    // if(req.user._id != req.params.id ) throw new Error('You can\'t delete this incoming request');
    const reqId = new mongoose.Types.ObjectId(req.params.id);
    const creator = new mongoose.Types.ObjectId(req.user._id);
    const request = await IncomingRequest.findById(reqId);
    if (!request) {
      return res.status(404).json({ message: "Incoming request not found" });
    }
    if (request.creator === creator || req.user.role === "ADMIN") {
    const incomingRequest = await IncomingRequest.findByIdAndDelete(
      req.params.id
    );
    if (!incomingRequest) {
      return res.status(404).json({ message: "Incoming request not found" });
    }
    res.json({ message: "Incoming request deleted" });
  } else {
      return res.status(401).json({ message: "You can't delete this request" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllIncomingRequests,
  getIncomingRequestById,
  createIncomingRequest,
  updateIncomingRequestById,
  deleteIncomingRequestById,
  getIncomingRequestsByCreator
};
