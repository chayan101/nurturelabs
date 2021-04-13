const express = require("express");
require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();


//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//routes
app.use('/admin',adminRoutes);
app.use('/user', userRoutes);

const port =  process.env.PORT || 3000;


app.listen(port, ()=>{
  console.log('server up and running....');
});
