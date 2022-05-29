const helper = require('../helper/excelParseHelper');
const exceljs = require('exceljs');
const {s3} = require("../config/s3");
const History = require('../models').History;
const TransactionMoney = require('../models').TransactionMoney;

const { uuid } = require('uuidv4');


exports.uploadController = async (req,res,next)=>{
    //take and create the file name
    let Excelfile = req.file.buffer;
    let fileName = `${uuid()}_${req.file.originalname}`;
    let excelFileContent;
    try {
        //get the array of content from the excel file
        excelFileContent = await helper.parseExcelFile(Excelfile)
    } catch (e) {
        return next (e)
    }
    const params = {
        Body: Excelfile,
        Bucket: process.env.S3_BUCKET,
        Key: fileName
    };

    s3.putObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return next(e)
        }
             // an error occurred
        else     console.log(data);           // successful response
    });
    //Insert to SQL data for both objects with 1 code command
    try {
        await History.create({
                excelFile: fileName,
                TransactionMoneys: excelFileContent
            },
            {
                include: TransactionMoney
            })
    } catch (e) {
        console.log(e)
        return next (e)
    }

    res.send(excelFileContent);
    console.log("Response sent");
};

exports.getAllController = async (req,res)=>{
    let options = {
        order: [["createdAt", "DESC" ]],
        attributes: ["DatePost","content","amount"],
        include: [{
            model: History,
            attributes:['excelFile']
        }]
    }
    let transactions = await TransactionMoney.findAll(options);
    res.json(transactions);
}
