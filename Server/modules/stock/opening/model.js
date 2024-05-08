const { Schema  , model, default : mongoose }  = require('mongoose')
const openingStockSchema = new Schema({
    item: {
        type: String,
        required: true,
        ref: "StockItemReference"
    },
    supplier : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    VATno : {
        type : String,
        required : true
    },
    quantity: {
        type: Number,
        required: true
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
},{
    timestamps: true
})

openingStockSchema.pre("save", async function (next) {
    this.total = this.quantity * this.unitPrice;
    next(); 
});

const OpeningStock = model('OpeningStock',openingStockSchema)

module.exports = OpeningStock