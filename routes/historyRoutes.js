const express = require("express");
const router = express.Router();
const History = require("../schemas/historySchema");

router.post("/add", async (req, res) => {
  const { userId, address, date } = req.body;
  console.log("Adding to history...");

  try {
    const newHistoryItem = new History({
      userId,
      address,
      date,
    });
    const savedHistoryItem = await newHistoryItem.save();
    res.json(savedHistoryItem);
  } catch (error) {
    console.log("Error with saving to history: ", error);
  }
});

router.get("/get-all/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("USERiD", userId);

  try {
    const historicItem = await History.find({ userId: userId });
    res.json(historicItem);
  } catch (error) {
    console.log("Server: Error with getting history: ", error);
  }
});

router.delete("/delete", async (req, res) => {
  const { userId, _id } = req.body;
  console.log("Sever deleting item...", req.body);
  try {
    const historyItem = await History.findOneAndDelete({
      userId: userId,
      _id: _id,
    });
    res.json({ message: "Historic address deleted" });
  } catch (error) {
    console.log("Server: error deleting history item ", error);
  }
});

module.exports = router;
