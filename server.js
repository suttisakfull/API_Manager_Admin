//==============  import module =============//

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require('./databases/db');
const connectMQTT = require("./mqtt/mqtt");  //connect mqtt

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

const api_users = require("./routers/user-routes")
const api_categorys = require("./routers/category-routes")
const api_product = require("./routers/product-routes")
const api_branch = require("./routers/branch-routes")
const api_cloudinary = require("./routers/cloudinary-routes")
const api_device = require("./routers/device-routes")
//================ Connect Mongodb ================
 connectDB();
//================ Mqtt ===================
 connectMQTT();
//=============== Connect HTTP ==================
app.get('/',(req,res)=>{
    res.send("Hello World: API 5")
})
//==============  TEST ENV ===================
console.log("============OK==============");
const PORT = process.env.PORT
const IP  = process.env.IPADDRESS;
// const DB = process.env.DATABASE;
//=================== call Router ================
app.use("/v1", api_users);
app.use("/v1", api_categorys);
app.use("/v1", api_product);
app.use("/v1", api_branch);
app.use("/v1", api_cloudinary);
app.use("/v1", api_device);

console.log("IP:",IP)
console.log("PORT:",PORT)
// console.log("DB",DB)
app.listen(PORT,IP);

console.log(`Server started on IP ${IP} port ${PORT} :nodemon`);




