import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import {logger} from "./middleware/logger.js";
import {errorHandler} from "./middleware/errorHandler.js";
import dotenv from "dotenv";

dotenv.config()

const app = express();

app.use(express.json());

app.use(logger);

app.use(errorHandler);

app.use("/api", studentRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});