const expres = require("express");
const app = expres();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(expres.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome Boy" });
});

// Images Route
app.use("/api/images", require("./routes/imagesRoute"));

// Not Found Routes Handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log("Error:", err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// app.listen(process.env.PORT, () => {
//   console.log(`Server is Running on 5000 ${process.env.PORT}`);
// });
