const ReceivableNotes = require('./model');
const Joi = require('joi');
const receivableNotesSchema = require('./schema');
const mongoose = require('mongoose');

// GET - get all receivable notes
module.exports.getAllReceivableNotes = async (req, res) => {
    try {
       if(req.user.role != "ADMIN"){
        const receivableNotes = await ReceivableNotes.find();
        return res.json({message: 'All receivable notes', data: receivableNotes, success: true});
       }
        const receivableNotes = await ReceivableNotes.find();
        return res.json({message: 'All receivable notes', data: receivableNotes, success: true});
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false, message: 'Error getting receivable notes' });
    }
};


module.exports.getReceivableNotesByCreator = async (req, res) => {
    try {
        const creator =  mongoose.Types.ObjectId(req.user._id);
        const receivableNotes = await ReceivableNotes.find({creator});
        res.json({message: 'All receivable notes', data: receivableNotes, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false, message: 'Error getting receivable notes' });
    }
};

// GET - get receivable notes by id
module.exports.getReceivableNotesById = async (req, res) => {
    const { id } = req.params;
    try {
        const receivableNotes = await ReceivableNotes.findById(id);
        if (!receivableNotes) {
            return res.status(404).json({ message: 'Receivable notes not found' });
        }
        res.json({ message: 'Receivable notes found', data: receivableNotes, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false, message: 'Error getting receivable notes' });
    }
};

// POST - create new receivable notes
module.exports.createReceivableNotes = async (req, res) => {
    try {
        const { deliveryNote, supplier, date, isDeliveryFinished, purchaseOrder, VATno, receivableNotes } = req.body;

        // validate request body
        const schema = Joi.object({
            deliveryNote: Joi.string().required(),
            supplier: Joi.string().required(),
            date: Joi.date().required(),
            isDeliveryFinished: Joi.boolean().required(),
            purchaseOrder: Joi.string().required(),
            VATno: Joi.string().required(),
            receivableNotes: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        const creatorId = req.user._id;
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newReceivableNotes = new ReceivableNotes({
            deliveryNote,
            supplier,
            date,
            isDeliveryFinished,
            purchaseOrder,
            VATno,
            receivableNotes ,
            creator : creatorId
        });
        const savedReceivableNotes = await newReceivableNotes.save();
        res.status(201).json({message: 'Receivable notes created', data: savedReceivableNotes, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT - update receivable notes by id
module.exports.updateReceivableNotesById = async (req, res) => {
    try {
        const { id } = req.params;
        const { value, error } = receivableNotesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const theNote  = await ReceivableNotes.findById(id);
        if(!theNote) throw new Error('Receivable note not found')
        if(theNote.creator != req.user._id)  throw new Error('You are not allowed to update this receivable note')
        const receivableNotes = await ReceivableNotes.findByIdAndUpdate(id, {
            deliveryNote: value.deliveryNote,
            supplier: value.supplier,
            date: value.date,
            isDeliveryFinished: value.isDeliveryFinished,
            purchaseOrder: value.purchaseOrder,
            VATno: value.VATno,
            receivableNotes: value.receivableNotes
        });
        if (!receivableNotes) {
            return res.status(404).json({ success: false, message: 'Receivable notes not found' });
        }
        return res.status(200).json({ success: true, message: 'Receivable notes updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports.deleteReceivableNotesById = async (req, res) => {
    try {
        const { id } = req.params;
        const theNote  = await ReceivableNotes.findById(id);
        if(!theNote) throw new Error('Receivable note not found')
        if(theNote.creator != req.user._id)  throw new Error('You are not allowed to delete this receivable note')
        const deleted = await ReceivableNotes.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Receivable notes deleted successfully' });
        }
        throw new Error('Receivable notes not found');
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
