const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Nitish:nitish33@cluster0.ksobj.mongodb.net/CSV_upload?retryWrites=true&w=majority');

const database = mongoose.connection;
database.on('error',console.error.bind('Something went wrong'));
database.once('open',function(){
    console.log('Connection establish successfully')
});