const { Schema  , model } =  require("mongoose")


const stockItemReferenceSchema = new Schema({
    name  : {
        type :  String,
        required : true
    },
    stockItemCategory  : {
        type : Schema.Types.String,
        ref : "StockItemCategory"
    },
    unitOfMeasurement : {
        type : String,
        ref : "UnitOfMeasurement"
    },
    minimumStockLevel : {
        type : Number,
        required : true
    },
    code: {
        type: String,
        required: true
    },
    maximumStockLevel : {
        type : Number,
        required : true
    },
    stockAlertLevel : {
        type : Number,
        required : false,
        default : 0
    },
    isActive : {
        type : Boolean ,
        default : false
    }
    
})


const StockItemReference = model("StockItemReference", stockItemReferenceSchema);   
module.exports = StockItemReference ;