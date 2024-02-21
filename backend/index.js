const express = require("express")
const cors = require("cors")
const morgan = require("morgan");
const { DBConnection } = require("./db");
const { UserRouter } = require("./routes/user.routes");
const PORT = process.env.PORT || 8080

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use("/users",UserRouter)

app.get("/",(req,res)=>{
    res.send("Home")
})


app.listen(PORT,async()=>{
    try {
        await DBConnection
        console.log("Connected to DB")
        console.log(`Server running at http://localhost:${PORT}`)
    } catch (error) {
        
    }
    
})