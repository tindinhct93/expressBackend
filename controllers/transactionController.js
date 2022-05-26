
const helper = require('../helper/excelParseHelper');
const exceljs = require('exceljs');
const History = require('../models').History;
const TransactionMoney = require('../models').TransactionMoney;
const UserModel = require('../models').User;

exports.uploadController = async (req,res)=>{
    //Đang hardcode nhớ sữa chữa lại
    const user = await (UserModel.findOne({name:req.user}));
    //lấy file
    let Excelfiles = req.files;
    let transactionContent = [];
    for (excelFile of Excelfiles) {
        //array of row
        let excelFileContent = await helper.parseExcelFile(excelFile);
        fileContent = {filename: excelFile.filename, content:excelFileContent}
        transactionContent.push(fileContent)

        //let user = await UserModel.create({name: req.user});
        //let ID = user.id;
        //Write to DB
        await History.create({
            excelFile:excelFile.filename,
            userID: user.id,
            TransactionMoneys: excelFileContent
            },{
            include: [
                    TransactionMoney
            ]
        })
    }
    res.send(transactionContent)
};

exports.getAllController = async (req,res)=>{
    const user = await (UserModel.findOne({name:req.user}));
    let options = {
        field: ["DatePost","content","amount"],
        include: [{
            model: History,
            include: [{
                model: UserModel,
                where: {
                    name: user.name
            }}]
    }]}
    let transactions = await TransactionMoney.findAll(options);
    res.json(transactions)
}