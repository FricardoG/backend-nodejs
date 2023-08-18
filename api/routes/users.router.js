// Import the 'express' library/module.
const express = require('express');

// Create an instance of the Express router.
const router = express.Router();

// Define a route that handles GET requests to the root URL ('/').
router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  // Check if both 'limit' and 'offset' parameters are present in the query.
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  } else{

    // If either 'limit' or 'offset' (or both) are missing, send a plain text response.
    res.send('There are no parameters');
  }
});

// Export the router to be used in other parts of the application.
module.exports = router;
