const { model , Schema , default : mongoose} = require("mongoose");


const receivableNotesSchema = new Schema({
    deliveryNote : {
        type : String,
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
    creator : {
        type  : mongoose.Types.ObjectId ,
        ref : 'User',
        required :  true
    }
}, {
    timestamps: true
})


const ReceivableNote = model('ReceivableNote',receivableNotesSchema)

module.exports = ReceivableNote;