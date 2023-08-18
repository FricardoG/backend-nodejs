// Import the 'express' library/module.
const express = require('express');

// Create an instance of the Express router.
const router = express.Router();

// Define a more complex dynamic route for products within categories using parameters 'categoryId' and 'productId'.
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId} = req.params;

  // When a Get request is made to '/categories/:categoryId/products/:productId',
  // send back a JSON response containing category and product IDs.
  res.json({
    categoryId,
    productId,
  })
});

// Export the router to be used in other parts of the application
module.exports = router;
