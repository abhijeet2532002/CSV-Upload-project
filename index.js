const express = require('express');
const PORT = process.env.PORT || 5005;
const db = require('./config/mongoose')
const multer = require('multer');

const app = express();

app.use('/uploads',express.static(__dirname + '/uploads'));

// Encode the url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/',require('./router/Upload'));

app.listen(PORT,() => {
    console.log(`router is starting on port ${PORT}`);
});