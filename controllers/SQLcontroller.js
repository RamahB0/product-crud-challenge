const db = require('../config/mysql');

// POST /products -> Create a new product
exports.createProduct = async (req, res) => {
    try {
    const { name, price, category, inStock = true } = req.body;
    const sql = 'INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, price, category ?? null, inStock]);
    res.status(201).json({ id: result.insertId, name, price, category, inStock });
    } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message });
}
};

// GET /products -> Read all products
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
} catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
}
};

// GET /products/:id -> Read a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(rows[0]);
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
}
};

// PUT /products/:id -> Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;
    const sql =
      'UPDATE products SET name = ?, price = ?, category = ?, inStock = ? WHERE id = ?';
    const [result] = await db.query(sql, [name, price, category ?? null, inStock, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
    } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
}
};

// DELETE /products/:id -> Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
    } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message });
}
};
