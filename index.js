//importing express
const express = require('express')
const foodModel = require("./model")
const cardModel = require("./mode")
const cors =require('cors')
const { model } = require('mongoose')
const orderModel = require("./order")
const Feedback = require('./feedback');
const { Booking } = require("./booking");

const FoodOffer = require('./FoodOffer');

// 2.initalization
const app =express()
// middelwere || passing the parameter
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());
//api creation
app.get('/abhilash',(req,res)=>{
    res.send("I am abhilash")
})
//  api for adding data
app.post('/add',async(req,res)=>{
    var result = await new foodModel(req.body)
    result.save()
    res.send("data added")
})


//api for login
app.post("/login", (req, res) => {
    const { onumber, opass } = req.body;
    foodModel.findOne({ onumber: onumber })
        .then(user => {
            if (user) {
                if (user.opass === opass) {
                    res.json("success")
                } else {
                    res.json("password is incorrect")
                }
            } else {
                res.json("no data existed")
            }
        })
        .catch(err => console.log(err));
})

// code to add data to card
app.post('/add1',async(req,res)=>{
    var data = await new cardModel(req.body)
    data.save()
    res.send("data added")
})


//to view the card deytails
app.get('/view',async(req,res)=>{
    let data = await cardModel.find()
    res.json(data)
    console.log("data")
})


// APIs for orderModel
app.post("/order", async (req, res) => {
    var data = await new orderModel(req.body).save();
    res.send("order placed");
  });
  
  app.get("/orders", async (req, res) => {
    let data = await orderModel.find();
    res.json(data);
    console.log("data")
  });


  // API for submitting feedback
app.post('/feedback', async (req, res) => {
    const { name, email, rating, message } = req.body;
    const feedback = new Feedback({ name, email, rating, message });
    feedback.save()
      .then(() => {
        res.status(201).json({ message: 'Feedback submitted successfully' });
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'An error occurred while submitting feedback' });
      });
  });
  
  // API for retrieving feedback
  app.get('/feedback', async (req, res) => {
    Feedback.find()
      .then(feedback => {
        res.json(feedback);
      })
      .catch(error => {
        console.error('Error retrieving feedback:', error);
        res.status(500).json({ error: 'An error occurred while retrieving feedback' });
      });
  });
  

// 4.port
app.listen(3006,()=>{
    console.log("port 3006 is up and running")
})
//api get update
app.get('/Update',async (req, res)=> {
  var data = await Food.find()
  res.json(data)
  console.log(data)
})

// Deleting a data
app.delete('/remove/:id',async(req,res)=>{
  console.log(req.params);
  let id = req.params.id
  await cardModel.findByIdAndDelete(id);
  res.send("Deleted")

})

//api update
app.put('/edit/:id',async(req,res)=>{
  let id = req.params.id
  await cardModel.findByIdAndUpdate(id,req.body);
  res.send("updated")
  })

  // API to add booking data
app.post("/api/bookings", (req, res) => {
  const { name, numberOfPeople, date, time } = req.body;
  const newBooking = new Booking({ name, numberOfPeople, date, time });

  newBooking.save()
    .then(() => {
      res.status(201).json({ message: "Booking saved successfully" });
    })
    .catch(error => {
      console.error("Error saving booking:", error);
      res.status(500).json({ error: "An error occurred while saving booking" });
    });
});



// API to get booked tables
app.get("/api/bookings", async (req, res) => {
  Booking.find()
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      console.error("Error fetching booked tables:", error);
      res.status(500).json({ error: "An error occurred while fetching booked tables" });
    });
});


///////////////////////////////////////

// API to get all food offers
app.get('/foodOffers', async (req, res) => {
  FoodOffer.find()
    .then(foodOffers => {
      res.json(foodOffers);
    })
    .catch(err => {
      console.error('Error fetching food offers:', err);
      res.status(500).json({ error: 'An error occurred while fetching food offers' });
    });
});




// API to add a new food offer
app.post('/foodOffers', async (req, res) => {
  const { name, description, image } = req.body;
  const newFoodOffer = new FoodOffer({name ,description , image });
  newFoodOffer.save()
    .then(addedOffer => {
      res.status(201).json(addedOffer);
    })
    .catch(err => {
      console.error('Error adding food offer:', err);
      res.status(500).json({ error: 'An error occurred while adding food offer' });
    });
});

// API to update a food offer
app.put('/foodOffers/:id', async (req, res) => {
  const { id } = req.params;
  FoodOffer.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedOffer => {
      res.json(updatedOffer);
    })
    .catch(err => {
      console.error('Error updating food offer:', err);
      res.status(500).json({ error: 'An error occurred while updating food offer' });
    });
});

// API to delete a food offer
app.delete('/foodOffers/:id', async (req, res) => {
  const { id } = req.params;
  FoodOffer.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: 'Food offer deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting food offer:', err);
      res.status(500).json({ error: 'An error occurred while deleting food offer' });
    });
});


/////////////////////////////////////////////////////
// Get all orders
app.get('/orders', async (req, res) => {
  const orders = await orderModel.find();
  res.json(orders);
});

// Delete an order by ID
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  await orderModel.findByIdAndDelete(id);
  res.json({ message: 'Order deleted successfully' });
});

// Update an order by ID
app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { itemId, customerName, customerAddress } = req.body;
  await orderModel.findByIdAndUpdate(id, { itemId, customerName, customerAddress });
  res.json({ message: 'Order updated successfully' });
});

