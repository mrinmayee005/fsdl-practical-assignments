import mongoose from "mongoose";

/**
 * Establishing a connection to MongoDB.
 * Using async/await to ensure the database is ready before the server starts.
 */
const connectDB = async () => {

    // Listen for successful connection
    mongoose.connection.on('connected', () => {
        console.log("✅ MongoDB Local: Connection Established");
    });

    // Listen for connection errors
    mongoose.connection.on('error', (err) => {
        console.log("❌ MongoDB Connection Error: " + err);
    });

    try {
        // We use the URI from our .env file
        // The second parameter 'e-commerce' will be the name of your DB in Compass
        await mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Stop the server if DB connection fails
    }
}

export default connectDB;