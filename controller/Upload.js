const csv = require('../model/CSV_Upload');
const fs = require('fs');
const path = require('path');
var dataAll=0
module.exports.GetInfo = (req, res) => {
   
        csv.find({}).then((csfFile) => {    
            return res.render('Upload', {
                title: 'Upload',
                message: '',
                csv: csfFile,
               
            });
        }).catch((err) => {
            console.error(err);
        })   
}

module.exports.create = async (req, res) => {
    try {
        if (req.file.mimetype === 'text/csv') {
            const data = {
                FileName: req.file.originalname,
                Date: new Date().toDateString(),
                avatar: req.file.path,
                encFileName: req.file.filename
            }
            const csvFile = await csv.create(data);
            return res.redirect('/');
        } else {
            return res.render('Upload', {
                title: 'Upload',
                message: 'oops, Choose correct formate',
                csv: await csv.find({})
            });
        }
    } catch (err) {
        console.error(`something error during upload`, err);
        return;
    }
}

module.exports.delete = async (req, res) => {
    console.log(req.params.id);
    try {
        const deletedData = await csv.findByIdAndDelete(req.params.id);
        console.log(deletedData);

        // File delete code from folder
        let folderPath = 'uploads/CSV_File';
        let fileName = deletedData.encFileName;
        if (fs.existsSync(folderPath)) {
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    console.log(`error in file call back`, err);
                    return;
                }

                if (files.includes(fileName)) {
                    const filePathToDelete = path.join(folderPath, fileName);

                    fs.unlink(filePathToDelete, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log(`${fileName} has been deleted.`);
                        }
                    });
                } else {
                    console.log(`${fileName} not found in the folder.`);
                }
            });
        } else {
            console.log('Folder does not exist:', folderPath);
        }

        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return;
    }
}

module.exports.view = (req, res) => {
    console.log(req.params.id);
    return;
}

module.exports.edit = (req, res) => {
    console.log(req.params.id);
    return;
}

module.exports.search = async (req, res) => {
    const userQuery = req.body.query;

    try {
        // Use a regular expression to perform a partial search on the FileName field
        const csvInfo = await csv.find({ FileName: { $regex: userQuery, $options: 'i' } });
         if(req.xhr){
            return res.status(200).json({
                data:{
                    AllData: csvInfo
                }
            })
         }
    } catch (err) {
        // Handle errors appropriately, such as logging or sending an error response
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.hallo = (req, res) => {
    console.log(req.params.id)
    return res.render('Upload', {
        title: 'Upload',
        message: '',
        csv: dataAll
        
    });  
}
