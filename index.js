const express = require("express");
const moduleRoutes = require("./routes/routes");
const app = express();
require("dotenv").config();
const PORT = 3000;

app.use(express.json());

app.use("/api", moduleRoutes);
// Menangani rute dasar
app.get("/", (req, res) => {
  res.send("API for CPS LMS");
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});