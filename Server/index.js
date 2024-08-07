const express =  require("express");
const app = express(); 
require("dotenv").config();
const cors = require("cors"); 
const AuthRoutes = require("./routes/Auth");
const AccountRoutes = require("./routes/Account"); 
const PORT = process.env.PORT;
const dbConnect = require("./utils/database");
app.use(express.json()); 
app.use(cors());
app.get("/",(req , res)=>{
    res.send("You have landed on a test page !");
})
app.use("/api/v1",AuthRoutes);
app.use("/api/v1/account",AccountRoutes)
app.listen(PORT , ()=>{
    console.log(`Server listening at PORT -> ${PORT}`);
}) 
dbConnect(); 


