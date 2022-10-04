const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;
global.URL = url;

mongoose.connect(url, { useNewUrlParser: true,   useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB connection successfully");
});

const news_category = require('./routes/news_category.js');
app.use('/news_category', news_category);

const news = require('./routes/news.js');
app.use('/news', news);

const staff = require('./routes/staff.js');
app.use('/staff', staff);


app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
});