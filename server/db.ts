// This file sets up a PostgreSQL database connection pool using the 'pg' library.
import { Pool } from 'pg';
// Load environment variables from a .env file if it exists.
require('dotenv').config();

// Import the Pool class from the 'pg' library.
// A pool is a collection of reusable database connections that can be shared across multiple requests, allowing for more efficient and scalable database interactions
const { Pool: PgPool } = require('pg');

// Create a new Pool object using the PG_URI environment variable.
const pool = new Pool({
  connectionString: process.env.PG_URI,
});

// Export the pool object so it can be used by other modules.
export { pool };