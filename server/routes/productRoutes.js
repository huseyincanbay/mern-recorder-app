const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const { authenticateToken } = require('../middleware/authMiddleware'); 

// Create a new product
router.post("/products", authenticateToken, productController.createProduct);

// Get a list of all products
router.get("/products", productController.getProducts);

// Get a specific product by ID
router.get("/products/:id", authenticateToken, productController.getProductById);

// Update a product by ID
router.put("/products/:id", authenticateToken, productController.updateProduct);

// Delete a product by ID
router.delete("/products/:id", authenticateToken, productController.deleteProduct);

// Get the most recently added companies (limit to 3)
router.get('/recent-products', productController.getRecentProducts);

module.exports = router;
