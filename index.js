const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:process.env.FRONTENDOMAIN}))


const UserModel = require('./models').User

app.use((req,res,next)=>{
    //hardcode
    req.user = "user1";
    next()
})
//router
app.use('/transaction',require("./routes/transactionRouter"));


let options = {root :path.join(__dirname)};
app.get("/", (req,res) => res.sendFile('./view/index.html',options));

app.get('/sync', async (req,res) => {
    try {
        let models = require('./models');
        await models.sequelize.sync();
        res.send('Sync completed');
    } catch (e) {
        console.log(e);
        res.send('Error')
    }
})

app.use((err,req,res,next)=> {
    console.log(err);
    res.send("Something wrong happen in the server.")
})

app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
    console.log(`Server is running at port ${app.get('port')}`)
})