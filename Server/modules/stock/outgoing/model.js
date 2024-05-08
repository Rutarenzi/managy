const { model, Schema, Types } = require("mongoose");
const outgoingReqSchema = new Schema(
  {
    item: {
        type:String,
        required: true,
        ref: "StockItemReference"
    },
    dueDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitOfMeasurement: {
        type: String,
        required: true,
        ref: "UnitOfMeasurement"
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // enable timestamps
  }
);

outgoingReqSchema.pre("save", async function (next) {
  this.total = this.quantity * this.unitPrice;
  next();
});

const OutgoingRequest = model("OutgoingRequests", outgoingReqSchema);

module.exports = OutgoingRequest;
