// models.js
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://abhilashsanthosh6:abhilash@cluster0.tawp4dc.mongodb.net/gptc_mern?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("book connected")
   
})
.catch(err=>console.log(err))

let mongoschema = mongoose.Schema

const bookingSchema = new mongoose.Schema({
  name: String,
  numberOfPeople: Number,
  date: Date,
  time: String
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = { Booking };
