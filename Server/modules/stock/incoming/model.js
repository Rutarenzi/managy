const  { model  , Schema , default  : mongoose } = require("mongoose");

const incomingReqSchema = new Schema({
    item: {
        type: String,
        required: true,
        ref: "StockItemReference"
    },
    deliveryNote : {
        type : String,
        ref : "DeliveryNote",
        required : true
    },
    supplier : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now(),
        required : true
    },
    isDeliveryFinished : {
        type : Boolean,
        default : false,
        required : true
    },
    purchaseOrder : {
        type : String ,
        required : true
    },
    VATno : {
        type : String,
        required : true
    },
    receivableNotes : {
        type : String,
        required : true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitOfMeasurement: {
        type: String,
        required: true,
        ref: "UnitOfMeasurement"  
    },
    unitPrice: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
        default : 0
    },
    creator : {
        type  : mongoose.Types.ObjectId ,
        ref : 'User',
        required :  true
    }
}, {
    timestamps: true
})

incomingReqSchema.pre("save", async function (next) {
    this.total = this.quantity * this.unitPrice;
    next(); 
});

const IncomingRequest = model('IncomingRequest',incomingReqSchema)


module.exports = IncomingRequest;