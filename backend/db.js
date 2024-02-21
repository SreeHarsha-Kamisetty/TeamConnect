const mongoose = require("mongoose")
require("dotenv").config()


const DBConnection = mongoose.connect(process.env.mongoURL)


module.exports ={
    DBConnection
}