const express = require('express');
//want to use the router portion of express
const router = express.Router();

//curl -X GET http://localhost:3000/
router.get("/", (req,res) => {

    res.status(200).json({ "message":"RESTapi"});

});

//exports our routes
module.exports = router
