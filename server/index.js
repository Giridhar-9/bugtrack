const express = require("express");
const cors = require("cors");
const db = require("./db");
const bugRoutes = require("./routes/bugRoutes");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Bug Tracker Backend is running!");
});

app.use("/api/bugs", bugRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});