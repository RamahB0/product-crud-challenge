# Product CRUD Challenge: SQL & NoSQL Edition

Two parallel Express controllers implementing full CRUD for a `Product` resource - one backed by MongoDB (Mongoose), the other by MySQL (mysql2) - exposed side by side in the same app so their behavior can be compared directly.

## Product fields

| Field    | Type    | Notes                  |
|----------|---------|-------------------------|
| id       | auto    | ObjectId (Mongo) / AUTO_INCREMENT INT (MySQL) |
| name     | string  | required                |
| price    | number  | required                |
| category | string  | optional                |
| inStock  | boolean | default: true           |

## Project structure

```
config/
  mongo.js            # Mongoose connection
  mysql.js             # mysql2 connection pool
controllers/
  NoSQLcontroller.js   # CRUD via Mongoose
  SQLcontroller.js     # CRUD via mysql2 (parameterized queries)
models/
  Product.js           # Mongoose schema
routes/
  noSqlProductRoutes.js
  sqlProductRoutes.js
sql/
  schema.sql            # CREATE DATABASE / CREATE TABLE for MySQL
server.js
```

## Setup

1. Install dependencies:
2.    ```
         npm install
         ```
      2. Copy `.env.example` to `.env` and fill in your MongoDB and MySQL credentials.
      3. 3. Create the MySQL database/table:
         4.    ```
                  mysql -u root -p < sql/schema.sql
                  ```
               4. Start the server:
               5.    ```
                        npm start
                        ```

                     ## Endpoints

                 Both APIs expose the identical CRUD surface, mounted at different base paths:

           | Action        | MongoDB (Mongoose)         | MySQL (mysql2)              |
         |---------------|-----------------------------|-------------------------------|
         | Create        | `POST /api/mongo/products`      | `POST /api/mysql/products`      |
         | Read all      | `GET /api/mongo/products`       | `GET /api/mysql/products`       |
         | Read one      | `GET /api/mongo/products/:id`   | `GET /api/mysql/products/:id`   |
         | Update        | `PUT /api/mongo/products/:id`   | `PUT /api/mysql/products/:id`   |
         | Delete        | `DELETE /api/mongo/products/:id`| `DELETE /api/mysql/products/:id`|

         Example request body for create/update:

         ```json
         {
           "name": "Wireless Mouse",
           "price": 19.99,
           "category": "Electronics",
           "inStock": true
         }
         ```

         ## Design notes

         - The MySQL controller uses `?` placeholders throughout (parameterized queries) to prevent SQL injection, consistent with the "Connecting Node.js to a database" and "Performing CRUD operations" skills.
         - - The Mongoose schema and the SQL table were kept field-for-field identical so the two controllers are a fair side-by-side comparison of NoSQL vs SQL CRUD patterns.
           - - Each controller only talks to its own database - nothing is shared between them beyond the route shape, so either one can run independently if only one database is available.
             - 
