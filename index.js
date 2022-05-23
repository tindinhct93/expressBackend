const express = require('express');
const app = express();
//Do you need dotenv?

//router
app.use('/transaction',require("./routes/transactionRouter"));

app.get("/", (req,res) => res.send('test.html'));

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

app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
    console.log(`Server is running at port ${app.get('port')}`)
})