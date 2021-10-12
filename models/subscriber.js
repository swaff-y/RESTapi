//need to require mongoose
//allow us to interact with the database
const mongoose = require('mongoose');

//we will need a schema
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedToChannel:{
    type: String,
    required: true
  },
  subscribeDate:{
    type: Date,
    required: true,
    default: Date.now
  }
})

//this model allows us to interact with the database
module.exports = mongoose.model('Subscriber', subscriberSchema);
