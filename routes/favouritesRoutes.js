const express = require("express");
const router = express.Router();
const Favourite = require("../schemas/favouritesSchema");

router.post("/add", async (req, res) => {
  const { userId, name, address } = req.body;
  console.log("hello");
  try {
    const newFavourite = new Favourite({
      userId,
      name,
      address,
    });
    const savedFavourite = await newFavourite.save();
    res.json(savedFavourite);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-all/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("userId ", userId);
  try {
    const favourite = await Favourite.find({ userId: userId });
    res.json(favourite);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/one", async (req, res) => {
  const { userId, name } = req.body;
  try {
    const favourite = await Favourite.findOneAndDelete({
      userId: userId,
      name: name,
    });
    res.json({ message: "Favourite deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
