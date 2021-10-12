const express = require('express');
//want to use the router portion of express
const router = express.Router();
//get our subscribers model
const Subscriber = require("../models/subscriber")

//Get All
//need to use the async
router.get("/", async (req,res) => {
  //res.send("Hello World");
  try{
    //this will get all the different subscribers
    const subscribers = await Subscriber.find();

  //  res.json(subscribers)
    res.status(200).json(subscribers);
  } catch (err) {
    //a 500 error is an error on the database
    // There is no error on the api
    res.status(500).json({ message: err.message });
  }

});

//Get One
router.get("/:id", (req,res) => {
  //req.params.id
  res.send(req.params.id)
});

//Create one
router.post("/", async (req,res) => {
  //get subscriber details from the json body
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });
  try{
    const newSubscriber = await subscriber.save();
    //201 succesfully created an object
    //if left out a 200 is sent - which means succesfull
    // 201 is more specific - object created
    res.status(201).json(newSubscriber);
  } catch (err) {
    //when user give bad data send 400 because there is something wrong with the request.
    res.status(400).json({ message: err.message });
    console.log("Error", req.body);
  };
});
//Update One
//put updates all. Patch only updates the info passed
router.patch("/:id", (req,res) => {

});
//Delete One
router.delete("/:id", (req,res) => {

});

//exports our routes
module.exports = router
