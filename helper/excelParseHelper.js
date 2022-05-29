// input: Excel File
// output: Error or parse content
const helper = {};
const exceljs = require('exceljs');

const NO_HEADER = "Can't find the header of this file";
const NO_NULL = "Data is not allowed to be null, at line: ";
const WRONG_NUMBER = "Amount must be number, at line: "

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
        await workbook.xlsx.load(file);

        //Only take the content from sheet 1
        let currentWorksheets = workbook._worksheets[1];

        let [startRow, startColumn] = findStartPoint(currentWorksheets, "date");
        if (startRow == -1) {
            throw  new Error(NO_HEADER)
        }
        const result = [];
        for (let i= startRow+1; i<startRow+currentWorksheets.actualRowCount; i++) {
            let rowValue = currentWorksheets.getRow(i).values.filter(x=>x!=null)
            if (rowValue.length < 3) {
                throw  new Error(`${NO_NULL} ${i}`)
            }
            let amount = Number.parseFloat(rowValue[2]);
            if (Number.isNaN(amount)) {
                throw  new Error(`${WRONG_NUMBER} ${i}`)
            }
            rowValue[2] = amount;
            let value = {};
            [value.DatePost, value.content, value.amount] = rowValue
            result.push(value)
        }
        console.log(result)
        return result
}

module.exports = helper;