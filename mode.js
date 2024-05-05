const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://abhilashsanthosh6:abhilash@cluster0.tawp4dc.mongodb.net/gptc_mern?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("db connected")
   
})
.catch(err=>console.log(err))

let mongoschema = mongoose.Schema

const CardSchema = new mongoschema({
    title: String,
    price:Number ,
    image:String
})

var cardModel = mongoose.model("card",CardSchema)
module.exports = cardModel