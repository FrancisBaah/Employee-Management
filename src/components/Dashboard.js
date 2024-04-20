import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Employee Management</h2>
        <p className="text-gray-700">
          To manage employees, navigate to the{" "}
          <Link
            to="/employee"
            className="text-blue-500 hover:underline focus:underline"
          >
            Employees Page
          </Link>
          .
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Delete Employee</h2>
        <p className="text-gray-700">
          To delete an employee, go to the Employees Page and click on the{" "}
          <span className="text-red-500 font-semibold">"Delete"</span> button in
          the pop over in the Action.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Assign Supervisor</h2>
        <p className="text-gray-700">
          To assign a supervisor to an employee, go to the Employees Page and
          click on the{" "}
          <span className="text-green-500 font-semibold">"Set Supervisor"</span>
          button in the pop over in the Action.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Hierarchy Page</h2>
        <p className="text-gray-700">
          To view the hierarchy of employees, navigate to the
          <Link
            to="/chain-of-command"
            className="text-blue-500 hover:underline focus:underline ml-1"
          >
            Chain of Command
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
