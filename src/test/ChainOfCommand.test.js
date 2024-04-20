import React from "react";
import { render, screen, act } from "@testing-library/react";
import ChainOfCommand from "../components/ChainOfCommand";

const mockData = [
  {
    id: "1",
    name: "John Doe",
    supervisor: null,
    subordinates: [
      { id: "2", name: "Jane Doe", supervisor: "1", subordinates: [] },
    ],
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders ChainOfCommand component with employee nodes", async () => {
  await act(async () => {
    render(<ChainOfCommand />);
  });

  expect(screen.getByText("John Doe")).toBeInTheDocument();
});
