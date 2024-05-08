const {  model  , Schema,Types, default: mongoose, mongo  }  =  require("mongoose")
const reqSchema = new Schema({
  store: {
    type: String,
    required: true,
  },
  itemGroup: {
    type: String,
    required: true,
    ref: "StockItemCategory",
  },
  item: {
    type: String,
    required: true,
    ref: "StockItemReference",
  },
  department: {
    type: String,
    required: true,
    ref: "Department",
  },
  unitOfMeasurement: {
    type: String,
    required: true,
    ref: "UnitOfMeasurement",
  },
  quantity: {
    type: Number,
    required: false,
    default: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: false,
    default: false,
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  assetCode: {
    type: String,
    required: true,
  },
  vendor: {
    type: mongoose.Types.ObjectId,
    ref: mongoose.model("Vendor"),
    required: true,
  },
  requestedBy: {
    type: mongoose.Types.ObjectId,
    ref: mongoose.model("User"),
    required: true,
  },
  reason: {
    type: String,
    required: false,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true
});

reqSchema.pre("save", async function (next) {
  this.total = this.quantity * this.unitPrice;
  next();
});


const StockRequest  = model('StockRequest',reqSchema)

module.exports  = StockRequest