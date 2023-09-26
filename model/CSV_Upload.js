const mongoose = require('mongoose');
const path = require('path');
const multer  = require('multer')

const csvSchema = new mongoose.Schema({
    FileName : {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    avatar: {
        type: String
    },
    encFileName: {
        type: String
    }
}, {
    timestamps: true
});

const CSV_Upload = mongoose.model('CSV',csvSchema);
module.exports = CSV_Upload;