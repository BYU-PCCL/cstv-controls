import React from "react";
import { render, screen } from "@testing-library/react";
import CstvApp from "./CstvApp";

test("renders learn react link", () => {
  render(<CstvApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
