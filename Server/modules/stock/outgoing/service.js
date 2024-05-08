const Joi = require("joi");
const OutgoinRequest = require("./model");
const outgoingReqSchema = require("./schema");

// GET /outgoingrequests - get all outgoing requests
const getAllOutgoingRequests = async (req, res) => {
  try {
    if(req.user.role != "ADMIN"){
      const outgoingRequests = await OutgoinRequest.find({creator: req.user._id}).populate("item").populate("unitOfMeasurement");
      res.json({
        success: true,
        data: outgoingRequests,
        message: "All outgoing requests",
      });
    }

    const outgoingRequests = await OutgoinRequest.find().populate("item").populate("unitOfMeasurement");
    return res.json({
      success: true,
      data: outgoingRequests,
      message: "All outgoing requests",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// GET /outgoingRequests/:id - get a specific outgoing request by ID
const getOutgoingRequestById = async (req, res) => {
  try {
    const outgoingRequest = await OutgoinRequest.findById(req.params.id).populate("item").populate("unitOfMeasurement");
    if (!outgoingRequest) {
      return res.status(404).json({ message: "Incoming request not found" });
    }
    res.json(outgoingRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /outgoingRequests - create a new outgoing request
const createOutgoingRequest = async (req, res) => {
  try {
    const { error, value } = outgoingReqSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log(value);
    const outgoingRequest = new OutgoinRequest({
      ...value,
      creator: req.user._id
    });
    await outgoingRequest.save();
    res
      .status(201)
      .json({
        message: "outgoing request created",
        success: true,
        data: outgoingRequest,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /outgoingRequests/:id - update a specific outgoing request by ID
const updateOutgoingRequestById = async (req, res) => {
  try {
    const { error, value } = outgoingReqSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const outgoingRequest = await OutgoinRequest.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!outgoingRequest) {
      return res.status(404).json({ message: "Incoming request not found" });
    }
    res.json(outgoingRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /outgoingRequests/:id - delete a specific outgoing request by ID
const deleteOutgoingRequestById = async (req, res) => {
  try {
    const outgoingRequest = await OutgoinRequest.findByIdAndDelete(
      req.params.id
    );
    if (!outgoingRequest) {
      return res.status(404).json({ message: "Outgoing request not found" });
    }
    res.json({ message: "Outgoing request deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByUser = async (req, res)=>{
  try {
    const outgoingRequests = await OutgoinRequest.find({creator: req.user._id});
    res.json({ status:true, data: outgoingRequests});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllOutgoingRequests,
  getOutgoingRequestById,
  createOutgoingRequest,
  updateOutgoingRequestById,
  deleteOutgoingRequestById,
  getByUser
};
