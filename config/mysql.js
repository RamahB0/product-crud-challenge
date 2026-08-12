const mysql = require('mysql2');

// Create a connection pool using credentials from the .env file
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
          waitForConnections: true,
            connectionLimit: 10,
            });

            // Quick sanity check on startup
            pool.getConnection((err, connection) => {
              if (err) {
                  console.error('MySQL connection error:', err.message);
                      return;
                        }
                          console.log('MySQL connected');
                            connection.release();
                            });

                            module.exports = pool.promise();
                            
