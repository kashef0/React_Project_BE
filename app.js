const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const handleUser = require('./routes/UserRouter')


const app = express();



app.use(express.json());
app.use(cors());

app.use('/user', handleUser);





mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDb kopplad..."))
.catch(err => console.log(err));


app.listen(3000, ()=> {
    console.log('server körs på port 3000');
});