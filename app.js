// 1️⃣ Environment
import dotenv from "dotenv";
dotenv.config(); // initialize environment variables first

// 2️⃣ Third-party modules
import express from "express";

// 3️⃣ Utilities / middleware
import loggerUtils from "./utils/loggerUtils.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";

// 4️⃣ Routes
import studentRoutes from "./routes/studentRoutes.js";

// ----------------------------
// App initialization
// ----------------------------
const app = express();

// Parse incoming JSON
app.use(express.json());

// Request logging middleware
app.use(requestLogger);

// API routes
app.use("/api", studentRoutes);

// Error handling middleware (always after routes)
app.use(errorHandler);

// Log server startup
loggerUtils.info("Server is starting...");

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    loggerUtils.info(`Server running on port ${PORT}`);
});