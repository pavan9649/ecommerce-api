const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const port=process.env.PORT || 3000;
//const authjwt=require("./helpers/jwt");
app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
//app.use(authjwt());

require("dotenv/config");

const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");

const api = process.env.API_URL;
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/products`, productsRoutes);
const DB=process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   
}).then(()=>{
    console.log(`connection succesful`);
}).catch((e)=>{
    console.log('no connection');
})

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});