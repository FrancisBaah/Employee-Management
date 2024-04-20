import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Employee component", () => {
  render(<App />);
  const employeeElement = screen.getByText(/Employee/i);
  expect(employeeElement).toBeInTheDocument();
});
