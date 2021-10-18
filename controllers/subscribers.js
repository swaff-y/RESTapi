const express = require('express');
//want to use the router portion of express
const router = express.Router();
//get our subscribers model
const Subscriber = require("../models/subscriber")

//Get All
//need to use the async
//curl -X GET http://localhost:3000/subscribers/
router.get("/", async (req,res) => {

  try{
    //this will get all the different subscribers
    const subscribers = await Subscriber.find();
    //res.json(subscribers)
    res.status(200).json(subscribers);
  } catch (err) {
    //a 500 error is an error on the database
    // There is no error on the api
    res.status(500).json({ message: err.message });
  }

});

//Get One
//curl -X GET http://localhost:3000/subscribers/6167f42172f1a407b2bcbeef
//The "getSubscriber" middleware will get the subscriber with the id
router.get("/:id", getSubscriber, (req,res) => {
  res.status(200).json(res.subscriber);
});

//Create one
//curl -X POST -H "Content-Type: application/json" -d '{"name":"Kyle","subscribedToChannel":"Swaff-y"}' http://localhost:3000/subscribers/
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
  };
});
//Update One
//put updates all. Patch only updates the info passed
//curl -X PATCH -H "Content-Type: application/json" -d '{"name":"Chase"}' http://localhost:3000/subscribers/616a105a06b836c0c411b00a
router.patch("/:id", getSubscriber, async (req,res) => {
  if(req.body.name !== null){
    res.subscriber.name = req.body.name;
  }
  if(req.body.name !== null){
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }

  try{
    const updatedSubscriber = await res.subscriber.save();
    res.status(201).json(updatedSubscriber)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
});
//Delete One
//curl -X DELETE http://localhost:3000/subscribers/6167f42172f1a407b2bcbeef
router.delete("/:id", getSubscriber, async (req,res) => {
  try{
    //try remove the subscriber
    await res.subscriber.remove();
    res.status(201).json({ message: "Deleted Subscriber " + res.subscriber.name});
  } catch (err) {
    //else catch the error
    res.status(500).json({ message: err.message });
  }
});

//middleware function to get subscriber
async function getSubscriber(req, res, next){
  let subscriber;
  try{
    subscriber = await Subscriber.findById(req.params.id);
    if(subscriber === null){
      //404 status means you could not find something
      return res.status(404).json({ message: "Could not find subscriber with id " + req.params.id})
    }
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }

  //set response to be equal to subscriber
  res.subscriber = subscriber;
  // call next to move onto the next piece of middleware or on to the actual request itself
  next()
}

//exports our routes
module.exports = router
