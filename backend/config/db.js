const mongoose = require("mongoose");

/** Connect to MongoDB. Resolves with the connection, rejects on failure so
 * server.js can decide whether to run degraded (no DB) or exit. */
function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) {
    return Promise.reject(new Error("MONGO_URI is not set (see .env.example)"));
  }
  return mongoose.connect(uri);
}

module.exports = { connectDB };
