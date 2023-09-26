const express = require('express');
const PORT = process.env.PORT || 5005;
const db = require('./config/mongoose')
// import express layout
const expressLayout = require('express-ejs-layouts');
const multer = require('multer');

const app = express();

// express Layout
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
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