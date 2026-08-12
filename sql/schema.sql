-- MySQL (SQL) side of the Product CRUD Challenge.
-- Fields mirror the Mongoose schema so both controllers manage equivalent data.

CREATE DATABASE IF NOT EXISTS product_crud_challenge;
USE product_crud_challenge;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NULL,
          inStock BOOLEAN NOT NULL DEFAULT TRUE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
              );
              
