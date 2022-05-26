// input: Excel File
// output: Error or parse content
const helper = {};
const exceljs = require('exceljs');
const Stream =require('stream');
const path = require('path');


function findStartPoint (worksheet, word) {
    for (let i = 1; i < worksheet.rowCount; i++) {
        for (let j = 1; j < worksheet.columnCount; j++) {
            if (worksheet.getRow(i).getCell(j).value == word) {
                return [i,j];
            }
        }
    }
    return [-1,-1]
}

helper.parseExcelFile = async (file) => {
    const workbook = new exceljs.Workbook();

    await workbook.xlsx.readFile(`uploads/${file.filename}`);

    //await workbook.xlsx.readFile(file);
    // Lay file name luu vao bang 1.
    // Lay noi dung file luu vao bang 2

    // Only take the current sheet. Will be write one contennt
    let currentWorksheets = workbook._worksheets[1];

    let [startRow, startColumn] = findStartPoint(currentWorksheets, "date");
    console.log([startRow, startColumn])
    if (startRow == -1) {
        throw  new Error("Không tìm thấy header theo mẫu yêu cầu trong file Excel")
    }
    const result = [];
    for (let i= startRow+1; i<startRow+currentWorksheets.actualRowCount; i++) {
        let rowValue = currentWorksheets.getRow(i).values.filter(x=>x!=null)
        if (rowValue.length < 3) {
            throw  new Error(`Dữ liệu không được phép bỏ trống tại hàng thứ: ${i}`)
        }
        let amount = Number.parseFloat(rowValue[2]);
        if (Number.isNaN(amount)) {
            throw  new Error(`Số tiến phải là 1 số tại hàng thứ ${i}`)
        }
        rowValue[2] = amount;
        let value = {};
        [value.DatePost, value.content, value.amount] = rowValue
        result.push(value)
    }
    console.log(result)
    return result
}

/*
helper.parseExcelFile(`a-1653431291476.xlsx`).then(
    content => console.log(content)
).catch(e=>console.log(e))
*/

module.exports = helper;