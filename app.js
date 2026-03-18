import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

import loggerUtils from "./utils/loggerUtils.js";

import dotenv from "dotenv";

dotenv.config()

const app = express();

app.use(express.json());

app.use("/api", studentRoutes);

loggerUtils.info("Server is starting...");

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
