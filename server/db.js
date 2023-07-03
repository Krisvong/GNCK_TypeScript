"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// This file sets up a PostgreSQL database connection pool using the 'pg' library.
const pg_1 = require("pg");
// Load environment variables from a .env file if it exists.
require('dotenv').config();
// Import the Pool class from the 'pg' library.
// A pool is a collection of reusable database connections that can be shared across multiple requests, allowing for more efficient and scalable database interactions
const { Pool: PgPool } = require('pg');
// Create a new Pool object using the PG_URI environment variable.
const pool = new pg_1.Pool({
    connectionString: process.env.PG_URI,
});
exports.pool = pool;
