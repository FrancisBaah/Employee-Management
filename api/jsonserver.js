module.exports = (req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Check if the request method is OPTIONS (preflight request)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond with 200 OK for preflight requests
  }

  // Respond with JSON data containing sample employee information
  res.status(200).json({
    employees: [
      {
        name: "Ali",
        supervisor: "",
        id: "984b",
      },
      {
        name: "Wafeeq",
        supervisor: "Ali",
        id: "f0c3",
      },
      {
        name: "Aysar",
        supervisor: "Wafeeq",
        id: "6306",
      },
      {
        name: "Moied",
        supervisor: "Aysar",
        id: "2658",
      },
      {
        id: "6a33",
        name: "Francis Baah",
        supervisor: "Aysar",
      },
      {
        id: "06ff",
        name: "Charlot",
        supervisor: "Ali",
      },
      {
        id: "6718",
        name: "regg",
        supervisor: "Aysar",
      },
      {
        id: "9028",
        name: "bbf",
        supervisor: "Aysar",
      },
    ],
  });
};
