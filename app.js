import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", studentRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});