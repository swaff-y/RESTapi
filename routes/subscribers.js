const express = require('express');
//want to use the router portion of express
const router = express.Router();

//Get All
router.get("/", (req,res) => {
  res.send("Hello World")
});
//Get One
router.get("/:id", (req,res) => {
  //req.params.id
  res.send(req.params.id)
});
//Create one
router.post("/", (req,res) => {

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
