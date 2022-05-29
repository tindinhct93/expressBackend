const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:process.env.FRONTENDOMAIN}))

//router
app.use('/transaction',require("./routes/transactionRouter"));

//function to create the database, will be remove in real life.
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
    console.log(typeof(err))
    res.status(501).json({ error: err.message })
})

app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
    console.log(`Server is running at port ${app.get('port')}`)
})