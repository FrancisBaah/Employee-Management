const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    // Read the contents of db.json synchronously
    const dbFilePath = path.join(__dirname, "db.json");
    const dbData = fs.readFileSync(dbFilePath, "utf8");

    // Parse the JSON data from db.json
    const jsonData = JSON.parse(dbData);

    // Respond with the JSON data from db.json
    res.status(200).json(jsonData);
  } catch (error) {
    // Handle errors if reading or parsing fails
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
