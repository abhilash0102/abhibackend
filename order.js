const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://abhilashsanthosh6:abhilash@cluster0.tawp4dc.mongodb.net/gptc_mern?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("order connected");
  })
  .catch((err) => console.log(err));

let mongoschema = mongoose.Schema;

const OrderSchema = new mongoschema({
  itemId: String,
  customerName: String,
  customerAddress: String,
});

var orderModel = mongoose.model("order", OrderSchema);
module.exports = orderModel;
