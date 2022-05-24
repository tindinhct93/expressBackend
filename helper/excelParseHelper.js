// input: Excel File
// output: Error or parse content
const helper = {};
const exceljs = require('exceljs');
const Stream =require('stream');
const path = require('path');


helper.parseExcelFile = async (file) => {
    const workbook = new exceljs.Workbook();

    await workbook.xlsx.readFile(`uploads/${file.filename}`);
    // Lay file name luu vao bang 1.
    // Lay noi dung file luu vao bang 2
    let worksheets = {name:file.filename, sheet :[]}
    workbook.eachSheet(function(worksheet, sheetId) {
        console.log(worksheet.name);
        worksheets.sheet.push(worksheet.name);
    });

    return worksheets;
}

module.exports = helper;