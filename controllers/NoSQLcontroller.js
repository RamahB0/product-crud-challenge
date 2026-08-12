const Product = require('../models/Product');

// POST /products -> Create a new product
exports.createProduct = async (req, res) => {
    try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
    } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message });
    }
};

// GET /products -> Read all products
exports.getAllProducts = async (req, res) => {
    try {
    const products = await Product.find();
    res.json(products);
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

// GET /products/:id -> Read a single product by its MongoDB _id
exports.getProductById = async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
    } catch (err) {
    res.status(400).json({ message: 'Invalid ID format', error: err.message });
    }
};

// PUT /products/:id -> Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return the updated document
            runValidators: true, // validate against schema
      });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
    } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
    }
};

// DELETE /products/:id -> Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
    } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message });
    }
};
