const express = require("express");
const router = express.Router();

router.post("/traffic-data", async (req, res) => {
  const { lat1, lng1, lat2, lng2 } = req.body;
  const url = `http://www.mapquestapi.com/traffic/v2/incidents?key=${process.env.MAP_QUEST_API_KEY}&boundingBox=${lat1},${lng1},${lat2},${lng2}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const severityLevels = data.incidents.map((incident) => incident.severity);

    let trafficCondition = "Light Traffic";
    if (severityLevels.some((severity) => severity >= 3)) {
      trafficCondition = "Heavy Traffic";
    } else if (severityLevels.some((severity) => severity === 2)) {
      trafficCondition = "Moderate Traffic";
    }
    res.json({ trafficCondition });
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
