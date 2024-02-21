const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const PORT = process.env.PORT || 8080

const app = express();
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.get("/",(req,res)=>{
    res.send("Home")
})


app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})