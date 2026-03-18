import mongoose from 'mongoose';
import loggerUtils from '../utils/loggerUtils.js';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          
        });

        loggerUtils.info(`MongoDB connected: ${conn.connection.host}`);

        console.log("MongoDB connected successfully");

    } catch (error) {

        loggerUtils.error(`Error connecting to MongoDB: ${error.message}`);

        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;