require('dotenv').config();

const express = require('express');
const connectMongo = require('./config/mongo');

const noSqlProductRoutes = require('./routes/noSqlProductRoutes');
const sqlProductRoutes = require('./routes/sqlProductRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB (MySQL pool connects lazily on first query, see config/mysql.js)
connectMongo();

// Two parallel APIs over the same Product resource:
// - /api/mongo/products  -> Mongoose / MongoDB (NoSQL)
// - /api/mysql/products  -> mysql2 / MySQL (SQL)
app.use('/api/mongo/products', noSqlProductRoutes);
app.use('/api/mysql/products', sqlProductRoutes);

app.get('/', (req, res) => {
  res.send('Product CRUD Challenge API is running');
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  
