module.exports = (req, res) => {
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
