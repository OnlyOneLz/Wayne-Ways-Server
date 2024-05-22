const express = require("express");
const router = express.Router();

router.post("/convert-address", async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const result = data.results[0];
      res.json(result.formatted_address);
    } else {
      console.error("Error reverse geocoding coordinates:", data.status);
      res.status(500).json({
        error: "Error reverse geocoding coordinates",
        details: data.status,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
router.post("/geocode", async (req, res) => {
  const { input } = req.body;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(input)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching geocode:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
