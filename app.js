// 1️⃣ Environment
import dotenv from "dotenv";
dotenv.config(); // initialize environment variables first
 
import cors from "cors"

import connectDB from "./config/db.js";

// 2️⃣ Third-party modules
import express from "express";

// 3️⃣ Utilities / middleware
import loggerUtils from "./utils/loggerUtils.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";

// 4️⃣ Routes
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

connectDB();

// ----------------------------
// App initialization
// ----------------------------
const app = express();

app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Request logging middleware
app.use(requestLogger);

// API routes
app.use("/api", studentRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware (always after routes)
app.use(errorHandler);

// Log server startup
loggerUtils.info("Server is starting...");

// Start server
if (typeof process.env.PORT !== "undefined") {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        loggerUtils.info(`Server running on port ${PORT}`);
    });
} else {
    const PORT = 5001;
    app.listen(PORT, () => {
        loggerUtils.info(`Server running on port ${PORT}`);
    });
    loggerUtils.error("PORT ERROR: PORT environment variable is not defined. Defaulting to 5001.");
}