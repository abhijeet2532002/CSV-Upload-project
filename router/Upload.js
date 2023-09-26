const express = require('express');
const router = express.Router();
const uploadController = require('../controller/Upload');

const multer= require('multer')
const upload=multer({
    dest: 'uploads/CSV_File'
})

router.get('/',uploadController.GetInfo);
router.post('/create',upload.single('avtar'),uploadController.create);
router.get('/delete/:id',uploadController.delete);
router.get('/view/:id',uploadController.view);
router.post('/search',uploadController.search);
router.get('/hallo/:id',uploadController.hallo)
module.exports = router;