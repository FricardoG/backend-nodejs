// Import the 'express' library/module.
const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
// Create an instance of the Express router.
const router = express.Router();
const service = new ProductsService();

// Define another route '/products'.
router.get('/', async (req, res) => {
  const products = await service.find();

  // Respond with a JSON containing the generated product information.
  res.json(products);
});

// Define a route '/products/filter' for filtering products (not implemented fully in this example).
router.get('/filter', (req, res) => {
  res.send('I am a filter feature'); // Respond with a message indicating the filter feature.
});

// Define a dynamic route for individual products using a parameter 'id'.
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Define a route for creating new products using a POST request.
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body; // Extract the data from the request body.
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(response);
});
module.exports = router;
