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

  // Sample employee data
  const employees = [
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
  ];

  // Handle GET request
  if (req.method === "GET") {
    return res.status(200).json({ employees });
  }

  // Handle PUT request
  if (req.method === "PUT") {
    const { id, name, supervisor } = req.body;
    const updatedEmployee = {
      id,
      name,
      supervisor,
    };
    // Logic to update the employee data based on id
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updatedEmployee } : emp
    );
    return res
      .status(200)
      .json({
        message: "Employee updated successfully",
        employees: updatedEmployees,
      });
  }

  // Handle DELETE request
  if (req.method === "DELETE") {
    const { id } = req.body;
    // Logic to delete employee based on id
    const remainingEmployees = employees.filter((emp) => emp.id !== id);
    return res
      .status(200)
      .json({
        message: "Employee deleted successfully",
        employees: remainingEmployees,
      });
  }

  // Invalid request method
  return res.status(405).json({ message: "Invalid request method" });
};
