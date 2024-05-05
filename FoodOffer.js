const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://abhilashsanthosh6:abhilash@cluster0.tawp4dc.mongodb.net/gptc_mern?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("offer connected");
  })
  .catch((err) => console.log(err));

let mongoschema = mongoose.Schema;


const foodOfferSchema = new mongoose.Schema({
    name:String ,
    description:String ,
    image:  String,
});

var FoodOffer = mongoose.model('FoodOffer', foodOfferSchema);

module.exports = FoodOffer;



