const languageRankings = require("../models/language"); // Import the Language model
const { fetchTiobeRankings } = require("../services/tiobeService"); // Import the fetchTiobeRankings function from the tiobeService module

const getTiobeRankings = async (req, res) => {
  try {
    const cachedRankings = await languageRankings.find().sort({ ranking: 1 }); // Check for cached rankings in the database, sorted by updatedAt in descending order and limited to 1 result
    if (
      cachedRankings.length > 0 &&
      new Date() - cachedRankings[0].updatedAt < 24 * 60 * 60 * 1000
    ) {
      // If cached rankings exist and are less than 24 hours old
      res.json({
        source: "database",
        data: cachedRankings[0],
      });
      const scrapedRankings = await tiobeService.fetchTiobeRankings(); // Fetch the latest TIOBE rankings using the service function
      if (scrapedRankings.length > 0) {
        // If the fetch was successful
        await languageRankings.insertMany(scrapedRankings); // Save the new rankings to the database
      }
      res.json({
        source: "tiobe_scraper",
        data: scrapedRankings,
      });
      return; // Return early to avoid sending multiple responses
    }

    const languages = await fetchTiobeRankings(); // Fetch the TIOBE rankings using the service function
    res.status(200).json(languages); // Send the fetched language data as a JSON response with a 200 status code
  } catch (error) {
    console.error("Error fetching TIOBE rankings:", error);
    res.status(500).json({ error: "Failed to fetch TIOBE rankings" }); // Send an error response with a 500 status code if the fetch fails
  }
};

module.exports = { getTiobeRankings }; // Export the getTiobeRankings function for use in other modules
