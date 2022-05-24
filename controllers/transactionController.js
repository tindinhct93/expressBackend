
const helper = require('../helper/excelParseHelper');
const exceljs = require('exceljs');

exports.uploadController = async (req,res)=>{

    let Excelfiles = req.files;
    let sheetnames = []
    for (excelFile of Excelfiles) {
        let filename = await helper.parseExcelFile(excelFile)
        sheetnames = [filename,...sheetnames];
    }
    res.send(sheetnames)
};
    // Take the element from the req // name and files
    // Parse the file and throw the error
    // Return nếu gặp Error
    // Handle Error này ở Front end
