const helper = require('../helper/excelParseHelper');
const exceljs = require('exceljs');
const {s3} = require("../config/s3");
const History = require('../models').History;
const TransactionMoney = require('../models').TransactionMoney;

const { uuid } = require('uuidv4');


exports.uploadController = async (req,res)=>{
    let Excelfile = req.file.buffer;
    //Create a file with a file name
    let fileName = `${uuid()}_${req.file.originalname}`;
    let excelFileContent = await helper.parseExcelFile(Excelfile)

    const params = {
        Body: Excelfile,
        Bucket: process.env.S3_BUCKET,
        Key: fileName
    };

    s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    await History.create({
        excelFile: Excelfile.filename,
        TransactionMoneys: excelFileContent
        },
        {
            include: TransactionMoney
        })
    res.send(excelFileContent);
    console.log("Response sent");
};

exports.getAllController = async (req,res)=>{
    const user = await (UserModel.findOne({name:req.user}));
    let options = {
        field: ["DatePost","content","amount"],
        include: [{
            model: History,
        }]
    }
    let transactions = await TransactionMoney.findAll(options);
    res.json(transactions);
}