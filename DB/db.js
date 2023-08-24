const mongoose = require("mongoose");
// connect to mongoose
require("dotenv").config()
let url = process.env.MONGO_URL;
const connection = mongoose.connect(url);
module.exports={
    connection
}