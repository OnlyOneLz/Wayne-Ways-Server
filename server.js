const cors = require("cors");
const express = require("express");
const verifyToken = require("./verifyToken");
const userRoutes = require("./routes/userRoutes");
const googleRoutes = require("./routes/googleRoutes");
const favouritesRoutes = require("./routes/favouritesRoutes");
const historyRoutes = require("./routes/historyRoutes");
require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This route is protected.", userId: req.userId });
});

app.use("/user", userRoutes);
app.use("/google", googleRoutes);
app.use("/favourites", favouritesRoutes);
app.use("/history", historyRoutes);
