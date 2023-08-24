
const express = require("express");
const { connection } = require("./DB/db");
const { uRouter } = require("./Route/userRouter");
const cors=require("cors")
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4500;
app.use(cors())
app.use(express.json());
app.use("/api",uRouter)
app.listen(port, async (req, res) => {
    try {
        await connection
        console.log(`db is connected now at port ${port}`)
    } catch (error) {
        console.log(`db is not connected!!`)
    }
})
